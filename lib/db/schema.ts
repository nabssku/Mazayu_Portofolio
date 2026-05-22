import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image_url: text("image_url").notNull(),
  demo_link: text("demo_link"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const shortLinks = pgTable("short_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  original_url: text("original_url").notNull(),
  clicks: integer("clicks").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  start_date: text("start_date").notNull(),
  end_date: text("end_date"),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const about = pgTable("about", {
  id: uuid("id").primaryKey().defaultRandom(),
  bio: text("bio").notNull(),
  photo_url: text("photo_url"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const seoSettings = pgTable("seo_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  keywords: text("keywords"),
  og_image: text("og_image"),
  hero_bg_image: text("hero_bg_image"),
  twitter_card: text("twitter_card"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const socialLinks = pgTable("social_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
