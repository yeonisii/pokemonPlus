// GET POST UPDATE DELETE

export async function GET() {
  // supabase에 있는 user정보 불러오기.
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(`/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-key": process.env.DATA_API_KEY!,
    },
  });
  const product = await res.json;

  return Response.json({ product });
}
