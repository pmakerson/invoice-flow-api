import { inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withMethods,
    withState
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import { InvoiceApiService } from './invoice-api.service';
import { Invoice, InvoiceDetails, InvoiceHistoryItem } from './invoice.models';

type InvoiceState = {
    invoices: Invoice[];

    error: string | null;

    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    history: InvoiceHistoryItem[];
    loading: boolean;
    details: InvoiceDetails | null;
};

const initialState: InvoiceState = {
    invoices: [],
    error: null,
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    history: [],
    loading: false,
    details: null
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

        function setLoading(loading: boolean) {
            patchState(store, { loading });
        }

        return {
            async loadInvoices() {
                setLoading(true);
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
                } finally {
                    setLoading(false);
                }
            },

            setPage(page: number) {
                patchState(store, { page });
            },

            async processOcr(invoiceId: string) {
                setLoading(true);
                resetError();

                try {
                    await firstValueFrom(api.processOcr(invoiceId));
                    await this.loadInvoices();
                } catch {
                    setError('Failed to process OCR');
                } finally {
                    setLoading(false);
                }
            },
            async loadHistory(invoiceId: string) {
                setLoading(true);
                resetError();
                try {
                    const history = await firstValueFrom(api.history(invoiceId));
                    await this.loadDetails(invoiceId);
                    patchState(store, { history });
                } catch {
                    setError('Failed to load invoice history');
                } finally {
                    setLoading(false);
                }
            },
            async loadDetails(invoiceId: string) {
                setLoading(true);
                resetError();

                try {
                    const details = await firstValueFrom(api.details(invoiceId));
                    patchState(store, { details });
                } catch {
                    setError('Failed to load invoice details');
                } finally {
                    setLoading(false);
                }
            },
        };
    })
);