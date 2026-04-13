export type FakeOcrResult = {
    rawText: string;
    vatNumber: string;
    dueDate: string;
    totalBeforeTax: string;
    totalTax: string;
    totalWithTax: string;
    confidence: string;
};

type InvoiceInput = {
    invoiceNumber: string;
    supplierName: string;
    amount: string;
    currency: string;
    invoiceDate: string;
};

export class FakeOcrService {
    async process(invoice: InvoiceInput): Promise<FakeOcrResult> {
        const totals = this.calculateTotals(invoice.amount);
        const dueDate = this.calculateDueDate(invoice.invoiceDate);
        const rawText = this.buildRawText(invoice);

        return {
            rawText,
            vatNumber: 'FR12345678901',
            dueDate,
            totalBeforeTax: totals.totalBeforeTax,
            totalTax: totals.totalTax,
            totalWithTax: totals.totalWithTax,
            confidence: '98.50',
        };
    }

    private calculateTotals(amount: string) {
        const totalWithTax = Number(amount);
        const totalBeforeTax = totalWithTax / 1.2;
        const totalTax = totalWithTax - totalBeforeTax;

        return {
            totalBeforeTax: totalBeforeTax.toFixed(2),
            totalTax: totalTax.toFixed(2),
            totalWithTax: totalWithTax.toFixed(2),
        };
    }

    private calculateDueDate(invoiceDateStr: string): string {
        const date = new Date(invoiceDateStr);
        date.setDate(date.getDate() + 30);
        return date.toISOString().slice(0, 10);
    }

    private buildRawText(invoice: InvoiceInput): string {
        return [
            `Invoice number: ${invoice.invoiceNumber}`,
            `Supplier: ${invoice.supplierName}`,
            `Total: ${invoice.amount} ${invoice.currency}`,
            `Invoice date: ${invoice.invoiceDate}`,
        ].join('\n');
    }
}