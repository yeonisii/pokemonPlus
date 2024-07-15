import { createServerClient } from "@/utils/supabase-server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabase = createServerClient();

export const GET = async (req: Request) => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  console.log(session);
  

  if (!session) {
    return NextResponse.json({ success: false, error: "400 BAD REQUEST" });
  }

  const { user } = JSON.parse(session.value);
  try {
    console.log(user);
    

    const { data, error } = await supabase
      .from("likes")
      .select("pokemon_id")
      .eq("user_id", user.id);

    if (error) throw error;

    const likedPokemonIds = data.map((item) => item.pokemon_id);
    return NextResponse.json({ success: true, likedPokemonIds });
  } catch (err) {
    console.log("Error fectching liked pokemon", err);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const POST = async (req: Request) => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return NextResponse.json({ success: false, error: "400 BAD REQUEST" });
  }

  const { user } = JSON.parse(session.value);
  const { pokemonId } = await req.json();

  try {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user.id)
      .eq("pokemon_id", pokemonId);

    if (error) throw error;

    if (data && data.length > 0) {
      // 이미 좋아요가 있으면 삭제
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("pokemon_id", pokemonId);

      if (deleteError) throw deleteError;
    } else {
      // 좋아요가 없으면 추가
      const { error: insertError } = await supabase
        .from("likes")
        .insert({ user_id: user.id, pokemon_id: pokemonId });

      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("좋아요 토글 오류:", err);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
