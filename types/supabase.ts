export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          id: number
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          user_id?: number | null
        }
      }
      contacts: {
        Row: {
          created_at: string | null
          description: string | null
          email: string | null
          id: number
          name: string
          number: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name: string
          number?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name?: string
          number?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
