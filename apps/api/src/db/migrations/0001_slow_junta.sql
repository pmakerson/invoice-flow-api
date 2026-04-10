CREATE TYPE "public"."invoice_action" AS ENUM('INVOICE_CREATED', 'OCR_PROCESSED', 'ASSIGNED', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('RECEIVED', 'OCR_PROCESSED', 'ASSIGNED', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"invoice_number" varchar(100) NOT NULL,
	"supplier_name" varchar(255) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"invoice_date" date NOT NULL,
	"status" "invoice_status" DEFAULT 'RECEIVED' NOT NULL,
	"assigned_to" varchar(36),
	"ocr_confidence" numeric(5, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_history" ADD CONSTRAINT "invoice_history_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_history" ADD CONSTRAINT "invoice_history_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_ocr_data" ADD CONSTRAINT "invoice_ocr_data_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;