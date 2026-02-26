import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table structure for projects:
// CREATE TABLE projects (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   problem_statement TEXT NOT NULL,
//   tech_stack VARCHAR(500) NOT NULL,
//   image_url VARCHAR(500) NOT NULL,
//   live_url VARCHAR(500),
//   github_url VARCHAR(500) NOT NULL,
//   project_type VARCHAR(10) NOT NULL CHECK (project_type IN ('web', 'mobile')),
//   order_index INTEGER NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
