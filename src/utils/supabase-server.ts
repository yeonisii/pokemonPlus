import { Database } from "@/types/supabase.users.types";
import { createClient } from "@supabase/supabase-js";

export function createServerClient<T = Database>() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUBABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) throw new Error("env check gogo");

  return createClient<T>(supabaseUrl, supabaseKey);
};
