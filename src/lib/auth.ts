
import { supabase } from '@/integrations/supabase/client';
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
  try {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    
    if (error) {
      toast.error(error.message);
      return false;
    }
    
    toast.success('Successfully signed up! Please check your email for verification.');
    return true;
  } catch (err) {
    console.error('Signup error:', err);
    toast.error('An error occurred during sign up. Please try again.');
    return false;
  }
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
