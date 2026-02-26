import { getProjects } from '../services/projectService'

export async function GET() {
  try {
    const projects = await getProjects()
    
    if (projects.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No projects found' }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(projects), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
