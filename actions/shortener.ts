'use server';

import { db } from '@/lib/db';
import { shortLinks } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function incrementClickAndGetUrl(slug: string): Promise<string | null> {
  try {
    const link = await db.query.shortLinks.findFirst({
      where: eq(shortLinks.slug, slug),
    });

    if (!link) {
      return null;
    }

    await db.update(shortLinks)
      .set({ clicks: sql`${shortLinks.clicks} + 1` })
      .where(eq(shortLinks.slug, slug));

    return link.original_url;
  } catch (error) {
    return null;
  }
}
