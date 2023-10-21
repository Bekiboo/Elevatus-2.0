export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "blog-post": {
        Row: {
          archived: boolean | null
          author: Json | null
          caption: string | null
          created_at: string | null
          elements: Json
          featured: boolean | null
          id: number
          TagId: number | null
          title: string | null
        }
        Insert: {
          archived?: boolean | null
          author?: Json | null
          caption?: string | null
          created_at?: string | null
          elements?: Json
          featured?: boolean | null
          id?: number
          TagId?: number | null
          title?: string | null
        }
        Update: {
          archived?: boolean | null
          author?: Json | null
          caption?: string | null
          created_at?: string | null
          elements?: Json
          featured?: boolean | null
          id?: number
          TagId?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog-post_TagId_fkey"
            columns: ["TagId"]
            referencedRelation: "Tags"
            referencedColumns: ["id"]
          }
        ]
      }
      children: {
        Row: {
          birth_date: string
          created_at: string | null
          full_name: string
          id: number
          preferred_name: string
        }
        Insert: {
          birth_date: string
          created_at?: string | null
          full_name: string
          id?: number
          preferred_name: string
        }
        Update: {
          birth_date?: string
          created_at?: string | null
          full_name?: string
          id?: number
          preferred_name?: string
        }
        Relationships: []
      }
      contact_form: {
        Row: {
          answered: boolean
          archived: boolean
          company: string | null
          created_at: string | null
          email: string
          first_name: string
          id: number
          important: boolean
          last_name: string
          message: string
        }
        Insert: {
          answered?: boolean
          archived?: boolean
          company?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: number
          important?: boolean
          last_name: string
          message: string
        }
        Update: {
          answered?: boolean
          archived?: boolean
          company?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: number
          important?: boolean
          last_name?: string
          message?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          role_id: number
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          role_id?: number
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          role_id?: number
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "role"
            referencedColumns: ["id"]
          }
        ]
      }
      role: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Tags: {
        Row: {
          id: number
          tagName: string | null
        }
        Insert: {
          id?: number
          tagName?: string | null
        }
        Update: {
          id?: number
          tagName?: string | null
        }
        Relationships: []
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
