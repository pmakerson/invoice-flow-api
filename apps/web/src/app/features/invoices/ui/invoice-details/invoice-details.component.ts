import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { InvoiceDetails } from '../../data-access/invoice.models';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InvoiceDetailsComponent {
  readonly details = input.required<InvoiceDetails | null>();

  readonly difference = computed(() => {
    const d = this.details();

    if (!d?.ocrData?.totalWithTax) {
      return null;
    }

    const invoiceAmount = Number(d.invoice.amount);
    const ocrAmount = Number(d.ocrData.totalWithTax);

    if (Number.isNaN(invoiceAmount) || Number.isNaN(ocrAmount)) {
      return null;
    }

    return invoiceAmount - ocrAmount;
  });
}