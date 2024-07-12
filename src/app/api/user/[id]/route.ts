// GET POST UPDATE DELETE
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // supabase에 있는 user정보 불러오기. (user에 있는 user_id)

  const { data, error } = await supabase
    .from("user")
    .select("user, user_id")
    .eq("user_id", "user_id"); // Correct

  if (error) console.log("error", error);

  return Response.json({ data });
}
