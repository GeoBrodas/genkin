'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithGitHub() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  console.log('data', data);

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  return data;
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  console.log(error);

  if (!error) {
    console.log('signed out');
    redirect('/');
  }
}
