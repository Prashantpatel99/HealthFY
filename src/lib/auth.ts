
import { supabase } from './supabase';
import { toast } from 'sonner';

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success('Successfully signed in!');
  return true;
}

export async function signUpWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success('Successfully signed up! Please check your email for verification.');
  return true;
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) {
    toast.error(error.message);
    return false;
  }
  return true;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success('Successfully signed out!');
  return true;
}
