import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Prayer {
  id: string
  text: string
  user_name: string
  user_id: string
  likes: string[]
  created_at: string
  category?: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  created_at: string
  last_login_at: string
}

// Database table names
export const TABLES = {
  PRAYERS: "prayers",
  USER_PROFILES: "user_profiles",
} as const
