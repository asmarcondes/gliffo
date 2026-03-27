export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      arena_players: {
        Row: {
          id: string
          is_host: boolean
          joined_at: string
          nickname: string
          online: boolean
          room_id: string
          team: string | null
        }
        Insert: {
          id: string
          is_host?: boolean
          joined_at?: string
          nickname: string
          online?: boolean
          room_id: string
          team?: string | null
        }
        Update: {
          id?: string
          is_host?: boolean
          joined_at?: string
          nickname?: string
          online?: boolean
          room_id?: string
          team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arena_players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "arena_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      arena_proposals: {
        Row: {
          id: string
          nickname: string
          player_id: string
          proposed_at: string
          room_id: string
          team: string
          turn_number: number
          word: string
        }
        Insert: {
          id?: string
          nickname: string
          player_id: string
          proposed_at?: string
          room_id: string
          team: string
          turn_number: number
          word: string
        }
        Update: {
          id?: string
          nickname?: string
          player_id?: string
          proposed_at?: string
          room_id?: string
          team?: string
          turn_number?: number
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "arena_proposals_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "arena_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      arena_rooms: {
        Row: {
          active_fx: Json
          code: string
          config: Json
          created_at: string
          current_turn: string
          host_id: string
          id: string
          phase: string
          phase_deadline: string | null
          status: string
          team_a_attempts: number
          team_a_clutches: number
          team_a_level: number
          team_a_powerups: Json
          team_a_time_ms: number
          team_a_word: string | null
          team_b_attempts: number
          team_b_clutches: number
          team_b_level: number
          team_b_powerups: Json
          team_b_time_ms: number
          team_b_word: string | null
          turn_number: number
          updated_at: string
          winner: string | null
        }
        Insert: {
          active_fx?: Json
          code: string
          config?: Json
          created_at?: string
          current_turn?: string
          host_id: string
          id?: string
          phase?: string
          phase_deadline?: string | null
          status?: string
          team_a_attempts?: number
          team_a_clutches?: number
          team_a_level?: number
          team_a_powerups?: Json
          team_a_time_ms?: number
          team_a_word?: string | null
          team_b_attempts?: number
          team_b_clutches?: number
          team_b_level?: number
          team_b_powerups?: Json
          team_b_time_ms?: number
          team_b_word?: string | null
          turn_number?: number
          updated_at?: string
          winner?: string | null
        }
        Update: {
          active_fx?: Json
          code?: string
          config?: Json
          created_at?: string
          current_turn?: string
          host_id?: string
          id?: string
          phase?: string
          phase_deadline?: string | null
          status?: string
          team_a_attempts?: number
          team_a_clutches?: number
          team_a_level?: number
          team_a_powerups?: Json
          team_a_time_ms?: number
          team_a_word?: string | null
          team_b_attempts?: number
          team_b_clutches?: number
          team_b_level?: number
          team_b_powerups?: Json
          team_b_time_ms?: number
          team_b_word?: string | null
          turn_number?: number
          updated_at?: string
          winner?: string | null
        }
        Relationships: []
      }
      arena_votes: {
        Row: {
          player_id: string
          proposal_id: string
          room_id: string
          team: string
          turn_number: number
          voted_at: string
        }
        Insert: {
          player_id: string
          proposal_id: string
          room_id: string
          team: string
          turn_number: number
          voted_at?: string
        }
        Update: {
          player_id?: string
          proposal_id?: string
          room_id?: string
          team?: string
          turn_number?: number
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "arena_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "arena_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arena_votes_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "arena_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_schedule: {
        Row: {
          created_at: string
          date: string
          difficulty: string
          difficulty_label: string
          puzzle: number
          word: string
        }
        Insert: {
          created_at?: string
          date: string
          difficulty: string
          difficulty_label: string
          puzzle: number
          word: string
        }
        Update: {
          created_at?: string
          date?: string
          difficulty?: string
          difficulty_label?: string
          puzzle?: number
          word?: string
        }
        Relationships: []
      }
      game_history: {
        Row: {
          attempts: number | null
          difficulty: string | null
          elapsed_ms: number | null
          hard_mode: boolean | null
          id: number
          is_archive: boolean | null
          played_at: string | null
          puzzle_date: string | null
          puzzle_num: number | null
          suspicious: boolean | null
          used_key: boolean | null
          user_id: string | null
          won: boolean | null
          word: string | null
          word_length: number | null
        }
        Insert: {
          attempts?: number | null
          difficulty?: string | null
          elapsed_ms?: number | null
          hard_mode?: boolean | null
          id?: never
          is_archive?: boolean | null
          played_at?: string | null
          puzzle_date?: string | null
          puzzle_num?: number | null
          suspicious?: boolean | null
          used_key?: boolean | null
          user_id?: string | null
          won?: boolean | null
          word?: string | null
          word_length?: number | null
        }
        Update: {
          attempts?: number | null
          difficulty?: string | null
          elapsed_ms?: number | null
          hard_mode?: boolean | null
          id?: never
          is_archive?: boolean | null
          played_at?: string | null
          puzzle_date?: string | null
          puzzle_num?: number | null
          suspicious?: boolean | null
          used_key?: boolean | null
          user_id?: string | null
          won?: boolean | null
          word?: string | null
          word_length?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          ach_id: string
          earned_at: string | null
          user_id: string
        }
        Insert: {
          ach_id: string
          earned_at?: string | null
          user_id: string
        }
        Update: {
          ach_id?: string
          earned_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          distribution: Json | null
          games_played: number | null
          games_won: number | null
          golden_consec: number | null
          golden_total: number | null
          last_played: string | null
          max_streak: number | null
          streak: number | null
          updated_at: string | null
          user_id: string
          wknd_dates: Json | null
        }
        Insert: {
          distribution?: Json | null
          games_played?: number | null
          games_won?: number | null
          golden_consec?: number | null
          golden_total?: number | null
          last_played?: string | null
          max_streak?: number | null
          streak?: number | null
          updated_at?: string | null
          user_id: string
          wknd_dates?: Json | null
        }
        Update: {
          distribution?: Json | null
          games_played?: number | null
          games_won?: number | null
          golden_consec?: number | null
          golden_total?: number | null
          last_played?: string | null
          max_streak?: number | null
          streak?: number | null
          updated_at?: string | null
          user_id?: string
          wknd_dates?: Json | null
        }
        Relationships: []
      }
      user_timed_counters: {
        Row: {
          counter_id: string
          user_id: string
          value: number | null
        }
        Insert: {
          counter_id: string
          user_id: string
          value?: number | null
        }
        Update: {
          counter_id?: string
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      compute_streak: { Args: { p_user_id: string }; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
