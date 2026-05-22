'use server';

import { signIn, signOut, auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return { error: 'Invalid credentials' };
    }
    throw error;
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  await signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getUser() {
  const session = await auth();
  return session?.user;
}
