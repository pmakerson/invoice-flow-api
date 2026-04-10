CREATE TABLE "invoice_history" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"invoice_id" varchar(36) NOT NULL,
	"action" "invoice_action" NOT NULL,
	"actor_id" varchar(36),
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_ocr_data" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"invoice_id" varchar(36) NOT NULL,
	"raw_text" text NOT NULL,
	"vat_number" varchar(50),
	"due_date" date,
	"total_before_tax" numeric(12, 2),
	"total_tax" numeric(12, 2),
	"total_with_tax" numeric(12, 2),
	"processed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invoice_ocr_data_invoice_id_unique" UNIQUE("invoice_id")
);
--> statement-breakpoint
ALTER TABLE "invoice_history" ADD CONSTRAINT "invoice_history_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_history" ADD CONSTRAINT "invoice_history_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_ocr_data" ADD CONSTRAINT "invoice_ocr_data_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;