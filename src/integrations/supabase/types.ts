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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          category: Database["public"]["Enums"]["event_category"]
          contact: Json | null
          created_at: string
          description: string
          end_date: string | null
          end_time: string | null
          id: string
          images: Json | null
          latitude: number
          location: string
          longitude: number
          merchant_id: string | null
          organizer: string | null
          price: string | null
          start_date: string
          start_time: string
          status: Database["public"]["Enums"]["submission_status"]
          title: string
          updated_at: string
          zone: string
        }
        Insert: {
          category: Database["public"]["Enums"]["event_category"]
          contact?: Json | null
          created_at?: string
          description: string
          end_date?: string | null
          end_time?: string | null
          id?: string
          images?: Json | null
          latitude: number
          location: string
          longitude: number
          merchant_id?: string | null
          organizer?: string | null
          price?: string | null
          start_date: string
          start_time: string
          status?: Database["public"]["Enums"]["submission_status"]
          title: string
          updated_at?: string
          zone: string
        }
        Update: {
          category?: Database["public"]["Enums"]["event_category"]
          contact?: Json | null
          created_at?: string
          description?: string
          end_date?: string | null
          end_time?: string | null
          id?: string
          images?: Json | null
          latitude?: number
          location?: string
          longitude?: number
          merchant_id?: string | null
          organizer?: string | null
          price?: string | null
          start_date?: string
          start_time?: string
          status?: Database["public"]["Enums"]["submission_status"]
          title?: string
          updated_at?: string
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string
          amenities: string[] | null
          category: Database["public"]["Enums"]["place_category"]
          created_at: string
          description: string
          email: string | null
          hours: Json | null
          id: string
          images: Json | null
          latitude: number
          long_description: string | null
          longitude: number
          merchant_id: string | null
          name: string
          phone: string | null
          price_range: string | null
          rating: number | null
          status: Database["public"]["Enums"]["submission_status"]
          subcategory: string | null
          updated_at: string
          website: string | null
          zone: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          category: Database["public"]["Enums"]["place_category"]
          created_at?: string
          description: string
          email?: string | null
          hours?: Json | null
          id?: string
          images?: Json | null
          latitude: number
          long_description?: string | null
          longitude: number
          merchant_id?: string | null
          name: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          subcategory?: string | null
          updated_at?: string
          website?: string | null
          zone: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          category?: Database["public"]["Enums"]["place_category"]
          created_at?: string
          description?: string
          email?: string | null
          hours?: Json | null
          id?: string
          images?: Json | null
          latitude?: number
          long_description?: string | null
          longitude?: number
          merchant_id?: string | null
          name?: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          subcategory?: string | null
          updated_at?: string
          website?: string | null
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "tourist" | "merchant" | "curator" | "analyst"
      event_category: "cultural" | "deportivo" | "gastronomico" | "familiar"
      place_category: "alojamiento" | "gastronomia" | "actividades"
      submission_status: "pending" | "approved" | "rejected"
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
    Enums: {
      app_role: ["tourist", "merchant", "curator", "analyst"],
      event_category: ["cultural", "deportivo", "gastronomico", "familiar"],
      place_category: ["alojamiento", "gastronomia", "actividades"],
      submission_status: ["pending", "approved", "rejected"],
    },
  },
} as const
