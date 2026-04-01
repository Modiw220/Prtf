import { supabase } from './client';

export type ContactStatus = 'new' | 'in_progress' | 'resolved' | 'spam';

export interface ContactSubmissionRecord {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export async function submitContactForm(input: {
  fullName: string;
  email: string;
  whatsapp?: string;
  message: string;
}) {
  const payload = {
    full_name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    whatsapp: input.whatsapp?.trim() || null,
    message: input.message.trim(),
  };

  const { error } = await supabase.from('contact_submissions').insert(payload);
  if (error) throw error;
}

export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as ContactSubmissionRecord[];
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
  if (error) throw error;
}
