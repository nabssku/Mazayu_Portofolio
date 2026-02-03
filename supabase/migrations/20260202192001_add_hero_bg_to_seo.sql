/*
  # Add Hero Background Image to SEO Settings

  ## Overview
  This migration adds a hero_bg_image field to the seo_settings table for managing the hero section background image.

  ## Changes

  ### 1. seo_settings table
  - Add `hero_bg_image` (text, nullable) - URL to hero background image in Supabase Storage

  ## Security
  - No changes to RLS policies needed as it's part of existing table
*/

-- Add hero_bg_image column to seo_settings
ALTER TABLE seo_settings ADD COLUMN hero_bg_image text;
