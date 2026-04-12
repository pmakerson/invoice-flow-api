import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Invoice } from '../data-access/invoice.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-table',
  imports: [DatePipe],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTableComponent {
  readonly invoices = input.required<Invoice[]>();
  readonly ocr = output<string>();
}
