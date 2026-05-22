'use server';

import { db } from '@/lib/db';
import { projects, shortLinks, skills, experiences, about, seoSettings, socialLinks } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/cloudinary';
import { eq, desc, sql } from 'drizzle-orm';

// Projects actions
export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const demo_link = formData.get('demo_link') as string;
  const image = formData.get('image') as File;

  if (!title || !description || !image) {
    return { error: 'All fields are required' };
  }

  try {
    const image_url = await uploadImage(image);

    await db.insert(projects).values({
      title,
      description,
      image_url,
      demo_link: demo_link || null,
    });

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const demo_link = formData.get('demo_link') as string;
  const image = formData.get('image') as File;

  if (!id || !title || !description) {
    return { error: 'ID, title, and description are required' };
  }

  try {
    let image_url = null;
    if (image && image.size > 0) {
      image_url = await uploadImage(image);
    }

    const updateData: any = {
      title,
      description,
      demo_link: demo_link || null,
    };

    if (image_url) {
      updateData.image_url = image_url;
    }

    await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, id));

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getProjects() {
  try {
    const data = await db.query.projects.findMany({
      orderBy: [desc(projects.created_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
}

// Short Links actions
export async function createShortLink(formData: FormData) {
  const slug = formData.get('slug') as string;
  const original_url = formData.get('original_url') as string;

  if (!slug || !original_url) {
    return { error: 'Slug and URL are required' };
  }

  try {
    await db.insert(shortLinks).values({
      slug: slug.toLowerCase().trim(),
      original_url,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    if (error.message.includes('unique')) {
      return { error: 'This slug already exists' };
    }
    return { error: error.message };
  }
}

export async function deleteShortLink(id: string) {
  try {
    await db.delete(shortLinks).where(eq(shortLinks.id, id));
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getShortLinks() {
  try {
    const data = await db.query.shortLinks.findMany({
      orderBy: [desc(shortLinks.created_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
}

// Stats
export async function getDashboardStats() {
  try {
    const projectsCount = (await db.select({ count: sql<number>`count(*)` }).from(projects))[0].count;
    const linksCount = (await db.select({ count: sql<number>`count(*)` }).from(shortLinks))[0].count;
    const totalClicks = (await db.select({ sum: sql<number>`sum(clicks)` }).from(shortLinks))[0].sum || 0;
    const skillsCount = (await db.select({ count: sql<number>`count(*)` }).from(skills))[0].count;
    const experiencesCount = (await db.select({ count: sql<number>`count(*)` }).from(experiences))[0].count;

    return {
      projectsCount: Number(projectsCount),
      linksCount: Number(linksCount),
      totalClicks: Number(totalClicks),
      skillsCount: Number(skillsCount),
      experiencesCount: Number(experiencesCount),
    };
  } catch (error) {
    return {
      projectsCount: 0,
      linksCount: 0,
      totalClicks: 0,
      skillsCount: 0,
      experiencesCount: 0,
    };
  }
}

// About actions
export async function getAbout() {
  try {
    const data = await db.query.about.findFirst({
      orderBy: [desc(about.updated_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function createAbout(formData: FormData) {
  const bio = formData.get('bio') as string;
  const image = formData.get('image') as File;

  if (!bio) {
    return { error: 'Bio is required' };
  }

  try {
    let photo_url = null;
    if (image && image.size > 0) {
      photo_url = await uploadImage(image);
    }

    // Modern approach: keep it simple, just insert. Or delete all then insert.
    await db.delete(about);
    
    await db.insert(about).values({
      bio,
      photo_url,
      updated_at: new Date(),
    });

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Skills actions
export async function createSkill(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const level = formData.get('level') as string;

  if (!name || !category || !level) {
    return { error: 'All fields are required' };
  }

  try {
    await db.insert(skills).values({
      name,
      category,
      level,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteSkill(id: string) {
  try {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getSkills() {
  try {
    const data = await db.query.skills.findMany({
      orderBy: [desc(skills.created_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
}

// Experiences actions
export async function createExperience(formData: FormData) {
  const title = formData.get('title') as string;
  const company = formData.get('company') as string;
  const start_date = formData.get('start_date') as string;
  const end_date = formData.get('end_date') as string;
  const description = formData.get('description') as string;

  if (!title || !company || !start_date || !description) {
    return { error: 'Title, company, start date, and description are required' };
  }

  try {
    await db.insert(experiences).values({
      title,
      company,
      start_date,
      end_date: end_date || null,
      description,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteExperience(id: string) {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getExperiences() {
  try {
    const data = await db.query.experiences.findMany({
      orderBy: [desc(experiences.created_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
}

// SEO actions
export async function getSeo() {
  try {
    const data = await db.query.seoSettings.findFirst({
      orderBy: [desc(seoSettings.updated_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function createSeo(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const keywords = formData.get('keywords') as string;
  const og_image = formData.get('og_image') as File;
  const hero_bg_image = formData.get('hero_bg_image') as File;
  const twitter_card = formData.get('twitter_card') as string;

  if (!title || !description) {
    return { error: 'Title and description are required' };
  }

  try {
    let og_image_url = null;
    let hero_bg_image_url = null;

    if (og_image && og_image.size > 0) {
      og_image_url = await uploadImage(og_image);
    }

    if (hero_bg_image && hero_bg_image.size > 0) {
      hero_bg_image_url = await uploadImage(hero_bg_image);
    }

    await db.delete(seoSettings);

    const insertData: any = {
      title,
      description,
      keywords: keywords || null,
      twitter_card: twitter_card || null,
      updated_at: new Date(),
    };

    if (og_image_url) insertData.og_image = og_image_url;
    if (hero_bg_image_url) insertData.hero_bg_image = hero_bg_image_url;

    await db.insert(seoSettings).values(insertData);

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Social links actions
export async function createSocialLink(formData: FormData) {
  const platform = formData.get('platform') as string;
  const url = formData.get('url') as string;
  const icon = formData.get('icon') as string;

  if (!platform || !url) {
    return { error: 'Platform and URL are required' };
  }

  try {
    await db.insert(socialLinks).values({
      platform,
      url,
      icon: icon || null,
    });

    revalidatePath('/');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteSocialLink(id: string) {
  try {
    await db.delete(socialLinks).where(eq(socialLinks.id, id));
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getSocialLinks() {
  try {
    const data = await db.query.socialLinks.findMany({
      orderBy: [desc(socialLinks.created_at)],
    });
    return { data };
  } catch (error: any) {
    return { error: error.message, data: [] };
  }
}
