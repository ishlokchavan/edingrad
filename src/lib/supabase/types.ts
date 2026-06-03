/**
 * Database types — generated from the live Supabase project against
 * `supabase/migrations/`. Regenerate after schema changes:
 *
 *   supabase gen types typescript --project-id <ref> --schema public \
 *     > src/lib/supabase/types.ts
 *
 * (or via the Supabase MCP `generate_typescript_types`).
 */
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      job_applications: {
        Row: {
          cover_letter_url: string | null
          created_at: string
          cv_url: string | null
          email: string
          id: string
          job_id: string
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          cover_letter_url?: string | null
          created_at?: string
          cv_url?: string | null
          email: string
          id?: string
          job_id: string
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          cover_letter_url?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string
          id?: string
          job_id?: string
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          location: string | null
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          audience: Database["public"]["Enums"]["lead_audience"] | null
          created_at: string
          email: string | null
          id: string
          listing_id: string | null
          name: string | null
          payload: Json
          phone: string | null
          reason: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["lead_status"]
          type: Database["public"]["Enums"]["lead_type"]
        }
        Insert: {
          audience?: Database["public"]["Enums"]["lead_audience"] | null
          created_at?: string
          email?: string | null
          id?: string
          listing_id?: string | null
          name?: string | null
          payload?: Json
          phone?: string | null
          reason?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          type: Database["public"]["Enums"]["lead_type"]
        }
        Update: {
          audience?: Database["public"]["Enums"]["lead_audience"] | null
          created_at?: string
          email?: string | null
          id?: string
          listing_id?: string | null
          name?: string | null
          payload?: Json
          phone?: string | null
          reason?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          type?: Database["public"]["Enums"]["lead_type"]
        }
        Relationships: [
          {
            foreignKeyName: "leads_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          alt: string | null
          id: string
          is_cover: boolean
          listing_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          id?: string
          is_cover?: boolean
          listing_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          id?: string
          is_cover?: boolean
          listing_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_imports: {
        Row: {
          created_at: string
          file_url: string | null
          id: string
          imported_by: string | null
          row_count: number | null
          source: string | null
          status: Database["public"]["Enums"]["import_status"]
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          id?: string
          imported_by?: string | null
          row_count?: number | null
          source?: string | null
          status?: Database["public"]["Enums"]["import_status"]
        }
        Update: {
          created_at?: string
          file_url?: string | null
          id?: string
          imported_by?: string | null
          row_count?: number | null
          source?: string | null
          status?: Database["public"]["Enums"]["import_status"]
        }
        Relationships: [
          {
            foreignKeyName: "listing_imports_imported_by_fkey"
            columns: ["imported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      listings: {
        Row: {
          agent_id: string
          amenities: string[]
          bathrooms: number | null
          bedrooms: number | null
          category: Database["public"]["Enums"]["listing_category"]
          community: string | null
          completion_status: string | null
          created_at: string
          currency: string
          description: string | null
          developer: string | null
          dld_permit: string | null
          featured: boolean
          id: string
          lat: number | null
          lng: number | null
          price: number | null
          rera_permit_number: string | null
          size_sqft: number | null
          slug: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
        }
        Insert: {
          agent_id: string
          amenities?: string[]
          bathrooms?: number | null
          bedrooms?: number | null
          category: Database["public"]["Enums"]["listing_category"]
          community?: string | null
          completion_status?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          developer?: string | null
          dld_permit?: string | null
          featured?: boolean
          id?: string
          lat?: number | null
          lng?: number | null
          price?: number | null
          rera_permit_number?: string | null
          size_sqft?: number | null
          slug: string
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
        }
        Update: {
          agent_id?: string
          amenities?: string[]
          bathrooms?: number | null
          bedrooms?: number | null
          category?: Database["public"]["Enums"]["listing_category"]
          community?: string | null
          completion_status?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          developer?: string | null
          dld_permit?: string | null
          featured?: boolean
          id?: string
          lat?: number | null
          lng?: number | null
          price?: number | null
          rera_permit_number?: string | null
          size_sqft?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          body: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          tags: string[]
          title: string
          type: Database["public"]["Enums"]["post_type"]
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[]
          title: string
          type: Database["public"]["Enums"]["post_type"]
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[]
          title?: string
          type?: Database["public"]["Enums"]["post_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_assets: {
        Row: {
          created_at: string
          id: string
          kind: string
          label: string | null
          mime_type: string | null
          post_id: string
          size_bytes: number | null
          sort_order: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          label?: string | null
          mime_type?: string | null
          post_id: string
          size_bytes?: number | null
          sort_order?: number
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          label?: string | null
          mime_type?: string | null
          post_id?: string
          size_bytes?: number | null
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_assets_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          languages: string[]
          name: string | null
          phone: string | null
          photo_url: string | null
          rera_brn: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["profile_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          languages?: string[]
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          rera_brn?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          languages?: string[]
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          rera_brn?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_editor_or_admin: { Args: never; Returns: boolean }
      user_role: {
        Args: { uid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      import_status: "pending" | "processing" | "completed" | "failed"
      job_status: "draft" | "published" | "closed"
      lead_audience: "developer" | "asset-management" | "private-wealth"
      lead_status: "new" | "contacted" | "qualified" | "closed" | "spam"
      lead_type:
        | "speak-to-expert"
        | "request-a-call"
        | "sell-instantly"
        | "mortgage"
        | "crypto-enquiry"
        | "listing-enquiry"
      listing_category: "residential" | "commercial" | "offplan"
      listing_status: "draft" | "published" | "sold" | "archived"
      post_status: "draft" | "published" | "archived"
      post_type: "press" | "insight" | "resource"
      profile_status: "pending" | "active" | "suspended"
      transaction_type: "sale" | "rent"
      user_role: "admin" | "editor" | "agent"
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
      import_status: ["pending", "processing", "completed", "failed"],
      job_status: ["draft", "published", "closed"],
      lead_audience: ["developer", "asset-management", "private-wealth"],
      lead_status: ["new", "contacted", "qualified", "closed", "spam"],
      lead_type: [
        "speak-to-expert",
        "request-a-call",
        "sell-instantly",
        "mortgage",
        "crypto-enquiry",
        "listing-enquiry",
      ],
      listing_category: ["residential", "commercial", "offplan"],
      listing_status: ["draft", "published", "sold", "archived"],
      post_status: ["draft", "published", "archived"],
      post_type: ["press", "insight", "resource"],
      profile_status: ["pending", "active", "suspended"],
      transaction_type: ["sale", "rent"],
      user_role: ["admin", "editor", "agent"],
    },
  },
} as const
