import z from "zod";

export const invoiceIdParamsSchema = z.object({
  id: z.uuid()
});

export type InvoiceIdParams = z.infer<typeof invoiceIdParamsSchema>;