import { supabase } from '../lib/supabase'

export interface Project {
  id?: number
  name: string
  problem_statement: string
  tech_stack: string
  image_url: string
  live_url?: string
  github_url: string
  project_type: 'web' | 'mobile'
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating project:', error)
    return null
  }
}

export async function updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...project, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating project:', error)
    return null
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}
