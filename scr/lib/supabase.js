import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const appsAPI = {
  // Get all apps with optional filtering
  async getApps(filters = {}) {
    let query = supabase
      .from('apps')
      .select(`
        *,
        profiles(name, avatar_url)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tags.cs.{${filters.search}}`)
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Get single app
  async getApp(id) {
    const { data, error } = await supabase
      .from('apps')
      .select(`
        *,
        profiles(name, avatar_url)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new app
  async createApp(appData) {
    const { data, error } = await supabase
      .from('apps')
      .insert([appData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update app
  async updateApp(id, updates) {
    const { data, error } = await supabase
      .from('apps')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete app
  async deleteApp(id) {
    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Increment download count
  async incrementDownloads(id) {
    const { error } = await supabase.rpc('increment_downloads', { app_id: id })
    if (error) throw error
  }
}

// Auth helper functions
export const authAPI = {
  // Sign up
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}
