import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceHistoryItem, PaginatedInvoices } from './invoice.models';
import { API_BASE_URL } from '../../../core/api/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  list(params: { page: number; pageSize: number; supplierName?: string; status?: string }): Observable<PaginatedInvoices> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.supplierName) {
      httpParams = httpParams.set('supplierName', params.supplierName);
    }

    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }

    return this.http.get<PaginatedInvoices>(`${this.baseUrl}/invoices`, {
      params: httpParams
    });
  }

  processOcr(invoiceId: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/invoices/process-ocr/${invoiceId}`, {});
  }

  history(invoiceId: string): Observable<InvoiceHistoryItem[]> {
    return this.http.get<InvoiceHistoryItem[]>(`${this.baseUrl}/invoices/history/${invoiceId}`);
  }
}
