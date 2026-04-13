import { Component, computed, inject } from '@angular/core';
import { InvoiceTableComponent } from '../ui/invoice-table/invoice-table.component';
import { InvoiceStore } from '../data-access/invoice.store';
import { InvoiceHistoryComponent } from '../ui/invoice-history/invoice-history.component';
import { LoadingIndicatorComponent } from '../ui/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-invoices-page',
  imports: [InvoiceTableComponent, InvoiceHistoryComponent, LoadingIndicatorComponent],
  templateUrl: './invoices-page.html',
  styleUrl: './invoices-page.css',
})
export class InvoicesPage {

  readonly store = inject(InvoiceStore);
  readonly totalPages = computed(() => this.store.totalPages());


  async ngOnInit() {
    await this.store.loadInvoices();
  }

  async onOcr(invoiceId: string) {
    await this.store.processOcr(invoiceId);
  }

  async previousPage() {
    if (this.store.page() <= 1) {
      return;
    }

    this.store.setPage(this.store.page() - 1);
    await this.store.loadInvoices();
  }

  async nextPage() {
    if (this.store.page() >= this.totalPages()) {
      return;
    }

    this.store.setPage(this.store.page() + 1);
    await this.store.loadInvoices();
  }

  async onHistory(invoiceId: string) {
    await this.store.loadHistory(invoiceId);
  }
}
