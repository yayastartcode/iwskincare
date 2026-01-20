import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_category" AS ENUM('cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen', 'masker', 'treatment', 'paket');
  CREATE TYPE "public"."enum_homepage_products_display_type" AS ENUM('featured', 'latest', 'manual');
  CREATE TYPE "public"."enum_contact_page_contacts_type" AS ENUM('whatsapp', 'phone', 'email', 'instagram', 'facebook', 'tiktok', 'youtube', 'address', 'shopee', 'tokopedia', 'other');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_products_category",
  	"short_description" varchar,
  	"description" jsonb,
  	"ingredients" varchar,
  	"how_to_use" jsonb,
  	"size" varchar,
  	"price" numeric,
  	"discount_price" numeric,
  	"is_featured" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"order_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_slider_desktop_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "hero_slider_mobile_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "hero_slider" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_auto_play" boolean DEFAULT true,
  	"settings_auto_play_interval" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_site_title" varchar NOT NULL,
  	"seo_site_description" varchar,
  	"seo_keywords" varchar,
  	"seo_favicon_id" integer,
  	"seo_og_image_id" integer,
  	"logo_image_id" integer,
  	"logo_text" varchar,
  	"navigation_cta_button_show" boolean DEFAULT true,
  	"navigation_cta_button_label" varchar DEFAULT 'Pesan Sekarang',
  	"navigation_cta_button_url" varchar,
  	"navigation_cta_button_open_in_new_tab" boolean DEFAULT true,
  	"contact_whatsapp" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"social_media_instagram" varchar,
  	"social_media_tiktok" varchar,
  	"social_media_youtube" varchar,
  	"social_media_facebook" varchar,
  	"footer_copyright_text" varchar,
  	"footer_show_social_media" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_about_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"image_id" integer,
  	"subtitle" varchar DEFAULT 'Tentang Kami',
  	"title" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"cta_button_show" boolean DEFAULT true,
  	"cta_button_label" varchar DEFAULT 'Selengkapnya',
  	"cta_button_url" varchar DEFAULT '/tentang',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"subtitle" varchar DEFAULT 'Produk Kami',
  	"title" varchar DEFAULT 'Produk Unggulan',
  	"description" varchar,
  	"display_type" "enum_homepage_products_display_type" DEFAULT 'featured',
  	"max_products" numeric DEFAULT 8,
  	"cta_button_show" boolean DEFAULT true,
  	"cta_button_label" varchar DEFAULT 'Lihat Semua Produk',
  	"cta_button_url" varchar DEFAULT '/produk',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "homepage_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"background_image_id" integer,
  	"title" varchar DEFAULT 'Gabung Menjadi Agen' NOT NULL,
  	"description" varchar DEFAULT 'Dapatkan penghasilan tambahan dengan bekerja dari rumah, gabung menjadi tim agen kami dan raih berbagai benefit!',
  	"button_label" varchar DEFAULT 'Daftar Sekarang',
  	"button_url" varchar,
  	"button_open_in_new_tab" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"title" varchar DEFAULT 'Tentang Kami',
  	"subtitle" varchar,
  	"about_image_id" integer,
  	"about_title" varchar,
  	"about_content" jsonb,
  	"vision_title" varchar DEFAULT 'Visi',
  	"vision_content" jsonb,
  	"mission_title" varchar DEFAULT 'Misi',
  	"mission_content" jsonb,
  	"values_title" varchar DEFAULT 'Nilai-Nilai Kami',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_contact_page_contacts_type" NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"url" varchar,
  	"is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_page_operational_hours_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"time" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hubungi Kami',
  	"subtitle" varchar DEFAULT 'Kami siap membantu Anda. Hubungi kami melalui salah satu kontak di bawah ini.',
  	"operational_hours_show" boolean DEFAULT true,
  	"operational_hours_title" varchar DEFAULT 'Jam Operasional',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mitra_page_partner_types_agen_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "mitra_page_partner_types_sub_agen_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "mitra_page_partner_types_reseller_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "mitra_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"title" varchar DEFAULT 'Pendaftaran Mitra',
  	"subtitle" varchar DEFAULT 'Bergabunglah menjadi mitra kami dan kembangkan bisnis Anda bersama kami',
  	"description" jsonb,
  	"partner_types_section_title" varchar DEFAULT 'Pilih Jenis Kemitraan',
  	"partner_types_agen_title" varchar DEFAULT 'Agen',
  	"partner_types_agen_description" varchar DEFAULT 'Mitra utama dengan wilayah eksklusif',
  	"partner_types_sub_agen_title" varchar DEFAULT 'Sub Agen',
  	"partner_types_sub_agen_description" varchar DEFAULT 'Mitra di bawah koordinasi Agen',
  	"partner_types_reseller_title" varchar DEFAULT 'Reseller',
  	"partner_types_reseller_description" varchar DEFAULT 'Mulai tanpa modal, untung maksimal',
  	"form_section_title" varchar DEFAULT 'Form Pendaftaran Mitra',
  	"form_section_description" varchar DEFAULT 'Isi form di bawah ini untuk mendaftar menjadi mitra kami',
  	"form_section_submit_button_label" varchar DEFAULT 'Daftar via WhatsApp',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_benefits" ADD CONSTRAINT "products_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slider_desktop_slides" ADD CONSTRAINT "hero_slider_desktop_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slider_desktop_slides" ADD CONSTRAINT "hero_slider_desktop_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slider_mobile_slides" ADD CONSTRAINT "hero_slider_mobile_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slider_mobile_slides" ADD CONSTRAINT "hero_slider_mobile_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation_links" ADD CONSTRAINT "site_settings_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_favicon_id_media_id_fk" FOREIGN KEY ("seo_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "features_items" ADD CONSTRAINT "features_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "features_items" ADD CONSTRAINT "features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_about_highlights" ADD CONSTRAINT "homepage_about_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_about" ADD CONSTRAINT "homepage_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_products_rels" ADD CONSTRAINT "homepage_products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_products_rels" ADD CONSTRAINT "homepage_products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_cta" ADD CONSTRAINT "homepage_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_contacts" ADD CONSTRAINT "contact_page_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_operational_hours_hours" ADD CONSTRAINT "contact_page_operational_hours_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mitra_page_partner_types_agen_requirements" ADD CONSTRAINT "mitra_page_partner_types_agen_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mitra_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mitra_page_partner_types_sub_agen_requirements" ADD CONSTRAINT "mitra_page_partner_types_sub_agen_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mitra_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mitra_page_partner_types_reseller_requirements" ADD CONSTRAINT "mitra_page_partner_types_reseller_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mitra_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mitra_page" ADD CONSTRAINT "mitra_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "products_benefits_order_idx" ON "products_benefits" USING btree ("_order");
  CREATE INDEX "products_benefits_parent_id_idx" ON "products_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_slider_desktop_slides_order_idx" ON "hero_slider_desktop_slides" USING btree ("_order");
  CREATE INDEX "hero_slider_desktop_slides_parent_id_idx" ON "hero_slider_desktop_slides" USING btree ("_parent_id");
  CREATE INDEX "hero_slider_desktop_slides_image_idx" ON "hero_slider_desktop_slides" USING btree ("image_id");
  CREATE INDEX "hero_slider_mobile_slides_order_idx" ON "hero_slider_mobile_slides" USING btree ("_order");
  CREATE INDEX "hero_slider_mobile_slides_parent_id_idx" ON "hero_slider_mobile_slides" USING btree ("_parent_id");
  CREATE INDEX "hero_slider_mobile_slides_image_idx" ON "hero_slider_mobile_slides" USING btree ("image_id");
  CREATE INDEX "site_settings_navigation_links_order_idx" ON "site_settings_navigation_links" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_links_parent_id_idx" ON "site_settings_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_seo_favicon_idx" ON "site_settings" USING btree ("seo_favicon_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "site_settings_logo_logo_image_idx" ON "site_settings" USING btree ("logo_image_id");
  CREATE INDEX "features_items_order_idx" ON "features_items" USING btree ("_order");
  CREATE INDEX "features_items_parent_id_idx" ON "features_items" USING btree ("_parent_id");
  CREATE INDEX "features_items_icon_idx" ON "features_items" USING btree ("icon_id");
  CREATE INDEX "homepage_about_highlights_order_idx" ON "homepage_about_highlights" USING btree ("_order");
  CREATE INDEX "homepage_about_highlights_parent_id_idx" ON "homepage_about_highlights" USING btree ("_parent_id");
  CREATE INDEX "homepage_about_image_idx" ON "homepage_about" USING btree ("image_id");
  CREATE INDEX "homepage_products_rels_order_idx" ON "homepage_products_rels" USING btree ("order");
  CREATE INDEX "homepage_products_rels_parent_idx" ON "homepage_products_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_products_rels_path_idx" ON "homepage_products_rels" USING btree ("path");
  CREATE INDEX "homepage_products_rels_products_id_idx" ON "homepage_products_rels" USING btree ("products_id");
  CREATE INDEX "homepage_cta_background_image_idx" ON "homepage_cta" USING btree ("background_image_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_icon_idx" ON "about_page_values" USING btree ("icon_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_about_image_idx" ON "about_page" USING btree ("about_image_id");
  CREATE INDEX "contact_page_contacts_order_idx" ON "contact_page_contacts" USING btree ("_order");
  CREATE INDEX "contact_page_contacts_parent_id_idx" ON "contact_page_contacts" USING btree ("_parent_id");
  CREATE INDEX "contact_page_operational_hours_hours_order_idx" ON "contact_page_operational_hours_hours" USING btree ("_order");
  CREATE INDEX "contact_page_operational_hours_hours_parent_id_idx" ON "contact_page_operational_hours_hours" USING btree ("_parent_id");
  CREATE INDEX "mitra_page_partner_types_agen_requirements_order_idx" ON "mitra_page_partner_types_agen_requirements" USING btree ("_order");
  CREATE INDEX "mitra_page_partner_types_agen_requirements_parent_id_idx" ON "mitra_page_partner_types_agen_requirements" USING btree ("_parent_id");
  CREATE INDEX "mitra_page_partner_types_sub_agen_requirements_order_idx" ON "mitra_page_partner_types_sub_agen_requirements" USING btree ("_order");
  CREATE INDEX "mitra_page_partner_types_sub_agen_requirements_parent_id_idx" ON "mitra_page_partner_types_sub_agen_requirements" USING btree ("_parent_id");
  CREATE INDEX "mitra_page_partner_types_reseller_requirements_order_idx" ON "mitra_page_partner_types_reseller_requirements" USING btree ("_order");
  CREATE INDEX "mitra_page_partner_types_reseller_requirements_parent_id_idx" ON "mitra_page_partner_types_reseller_requirements" USING btree ("_parent_id");
  CREATE INDEX "mitra_page_hero_image_idx" ON "mitra_page" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_benefits" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero_slider_desktop_slides" CASCADE;
  DROP TABLE "hero_slider_mobile_slides" CASCADE;
  DROP TABLE "hero_slider" CASCADE;
  DROP TABLE "site_settings_navigation_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "features_items" CASCADE;
  DROP TABLE "features" CASCADE;
  DROP TABLE "homepage_about_highlights" CASCADE;
  DROP TABLE "homepage_about" CASCADE;
  DROP TABLE "homepage_products" CASCADE;
  DROP TABLE "homepage_products_rels" CASCADE;
  DROP TABLE "homepage_cta" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "contact_page_contacts" CASCADE;
  DROP TABLE "contact_page_operational_hours_hours" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "mitra_page_partner_types_agen_requirements" CASCADE;
  DROP TABLE "mitra_page_partner_types_sub_agen_requirements" CASCADE;
  DROP TABLE "mitra_page_partner_types_reseller_requirements" CASCADE;
  DROP TABLE "mitra_page" CASCADE;
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_homepage_products_display_type";
  DROP TYPE "public"."enum_contact_page_contacts_type";`)
}
