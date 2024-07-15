// GET POST UPDATE DELETE
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  // supabase에 있는 user정보 불러오기. (user에 있는 user_id)
  console.log("params", params);
  const { id } = params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log("error", error);
  console.log("myData User =======>", data);

  return Response.json({ data });
}
