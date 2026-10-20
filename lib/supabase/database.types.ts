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
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'developer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'admin' | 'developer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'developer'
          created_at?: string
          updated_at?: string
        }
      }
      intakes: {
        Row: {
          id: string
          tracking_reference: string
          project_description: string
          track: 'student' | 'enterprise'
          complexity_score: number
          db_entities: number
          apis_hardware: number
          realtime_security: number
          add_ons: Json
          rush_delivery: boolean
          total_cost: number
          currency: string
          timeline: number
          client_name: string
          client_email: string
          client_phone: string | null
          status: string
          rejection_reason: string | null
          created_at: string
          ip_address: string | null
        }
        Insert: {
          id?: string
          tracking_reference?: string
          project_description: string
          track: 'student' | 'enterprise'
          complexity_score: number
          db_entities: number
          apis_hardware: number
          realtime_security: number
          add_ons?: Json
          rush_delivery?: boolean
          total_cost: number
          currency?: string
          timeline: number
          client_name: string
          client_email: string
          client_phone?: string | null
          status?: string
          rejection_reason?: string | null
          created_at?: string
          ip_address?: string | null
        }
        Update: {
          id?: string
          tracking_reference?: string
          project_description?: string
          track?: 'student' | 'enterprise'
          complexity_score?: number
          db_entities?: number
          apis_hardware?: number
          realtime_security?: number
          add_ons?: Json
          rush_delivery?: boolean
          total_cost?: number
          currency?: string
          timeline?: number
          client_name?: string
          client_email?: string
          client_phone?: string | null
          status?: string
          rejection_reason?: string | null
          created_at?: string
          ip_address?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          intake_id: string | null
          project_name: string
          status: 'intake_received' | 'scope_approved' | 'deposit_verified' | 'dev_phase' | 'beta_review' | 'final_release'
          total_cost: number
          currency: string
          deposit_paid: boolean
          deposit_amount: number | null
          beta_paid: boolean
          beta_amount: number | null
          final_paid: boolean
          final_amount: number | null
          complexity_score: number
          timeline: number
          client_name: string
          client_email: string
          client_phone: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          intake_id?: string | null
          project_name: string
          status?: 'intake_received' | 'scope_approved' | 'deposit_verified' | 'dev_phase' | 'beta_review' | 'final_release'
          total_cost: number
          currency?: string
          deposit_paid?: boolean
          deposit_amount?: number | null
          beta_paid?: boolean
          beta_amount?: number | null
          final_paid?: boolean
          final_amount?: number | null
          complexity_score: number
          timeline: number
          client_name: string
          client_email: string
          client_phone?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          intake_id?: string | null
          project_name?: string
          status?: 'intake_received' | 'scope_approved' | 'deposit_verified' | 'dev_phase' | 'beta_review' | 'final_release'
          total_cost?: number
          currency?: string
          deposit_paid?: boolean
          deposit_amount?: number | null
          beta_paid?: boolean
          beta_amount?: number | null
          final_paid?: boolean
          final_amount?: number | null
          complexity_score?: number
          timeline?: number
          client_name?: string
          client_email?: string
          client_phone?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      add_ons: {
        Row: {
          id: string
          name: string
          description: string | null
          cost_php: number
          cost_usd: number
          timeline_days: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cost_php: number
          cost_usd: number
          timeline_days?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cost_php?: number
          cost_usd?: number
          timeline_days?: number
          active?: boolean
          created_at?: string
        }
      }
      api_logs: {
        Row: {
          id: string
          endpoint: string
          method: string
          ip_address: string
          user_id: string | null
          status_code: number
          response_time_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          endpoint: string
          method: string
          ip_address: string
          user_id?: string | null
          status_code: number
          response_time_ms?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          endpoint?: string
          method?: string
          ip_address?: string
          user_id?: string | null
          status_code?: number
          response_time_ms?: number | null
          created_at?: string
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
  }
}
