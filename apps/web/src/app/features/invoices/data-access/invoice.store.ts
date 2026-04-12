import { inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withMethods,
    withState
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import { InvoiceApiService } from './invoice-api.service';
import { Invoice } from './invoice.models';

type InvoiceState = {
    invoices: Invoice[];

    error: string | null;

    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
};

const initialState: InvoiceState = {
    invoices: [],
    error: null,
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
};

export const InvoiceStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((store) => {
        const api = inject(InvoiceApiService);


        function setError(error: string | null) {
            patchState(store, { error });
        }

        function resetError() {
            patchState(store, { error: null });
        }

        return {
            async loadInvoices() {
                resetError();

                try {

                    const result = await firstValueFrom(
                        api.list({
                            page: store.page(),
                            pageSize: store.pageSize(),
                            supplierName: undefined,
                            status: undefined
                        })
                    );

                    patchState(store, {
                        invoices: result.data,
                        total: result.meta.total,
                        totalPages: result.meta.totalPages
                    });
                } catch {
                    setError('Failed to load invoices');
                }
            },

            setPage(page: number) {
                patchState(store, { page });
            },

            async processOcr(invoiceId: string) {
                resetError();

                try {
                    await firstValueFrom(api.processOcr(invoiceId));
                    await this.loadInvoices();
                } catch {
                    setError('Failed to process OCR');
                }
            }
        };
    })
);