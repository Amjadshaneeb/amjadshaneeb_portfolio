import { supabase } from '../lib/supabase'

export interface ContactSubmission {
  id?: number
  name: string
  email: string
  message: string
  created_at?: string
}

export async function saveContactSubmission(contactData: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(' Saving to Supabase:', contactData);

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contactData])
      .select()

    console.log(' Supabase response:', { data, error });

    if (error) {
      console.error(' Error saving contact submission:', error)

      // Fallback: Log to console for development
      console.log(' Fallback: Contact submission data:', contactData);
      console.log(' You can email this data to: amjadshaneeb783@gmail.com');

      return { success: false, error: error.message }
    }

    console.log(' Successfully saved contact submission');
    return { success: true }
  } catch (error) {
    console.error(' Unexpected error:', error)

    // Fallback: Log to console for development
    console.log(' Fallback: Contact submission data:', contactData);
    console.log(' You can email this data to: amjadshaneeb783@gmail.com');

    return { success: false, error: 'Failed to save contact submission' }
  }
}

// Database table structure for contact_submissions:
// CREATE TABLE contact_submissions (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   message TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
