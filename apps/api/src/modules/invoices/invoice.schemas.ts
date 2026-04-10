import { z } from 'zod';

export const invoiceStatusSchema = z.enum([
  'RECEIVED',
  'OCR_PROCESSED',
  'ASSIGNED',
  'APPROVED',
  'REJECTED'
]);

export const createInvoiceBodySchema = z.object({
  invoiceNumber: z.string().trim().min(1).max(100),
  supplierName: z.string().trim().min(1).max(255),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'amount must be a valid decimal with up to 2 decimals'),
  currency: z.string().trim().length(3).transform((value) => value.toUpperCase()),
  invoiceDate: z.iso.date()
});


export const listInvoicesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  status: invoiceStatusSchema.optional(),
  supplierName: z.string().trim().min(1).max(255).optional()
});

export type CreateInvoiceBody = z.infer<typeof createInvoiceBodySchema>;
export type ListInvoicesQueryParams = z.infer<typeof listInvoicesQuerySchema>;