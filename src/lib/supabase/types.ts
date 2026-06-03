/**
 * Database types.
 *
 * Minimal hand-written schema covering the tables the app uses so far. Replace
 * with generated types once the live project is reachable:
 *
 *   supabase gen types typescript --project-id <ref> --schema public \
 *     > src/lib/supabase/types.ts
 *
 * Source of truth for the schema: `supabase/migrations/0001_init.sql`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          type: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          audience: string | null;
          reason: string | null;
          payload: Json;
          listing_id: string | null;
          source_page: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          audience?: string | null;
          reason?: string | null;
          payload?: Json;
          listing_id?: string | null;
          source_page?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          type?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          audience?: string | null;
          reason?: string | null;
          payload?: Json;
          listing_id?: string | null;
          source_page?: string | null;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
