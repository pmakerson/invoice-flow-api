import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InvoiceHistoryItem } from '../../data-access/invoice.models';

@Component({
  selector: 'app-invoice-history',
  imports: [],
  templateUrl: './invoice-history.component.html',
  styleUrl: './invoice-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceHistoryComponent {
  readonly items = input.required<InvoiceHistoryItem[]>();
 }
