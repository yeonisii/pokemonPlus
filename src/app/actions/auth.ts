"use server";

import { createServerClient } from "@/utils/supabase-server";
import { compare, hash } from "bcrypt";
import { JoinFormData } from "../sign-up/page";
import { LoginFormData } from "../sign-in/page";
import { cookies } from "next/headers";
import { stringify } from "querystring";

export async function signUp(formData: JoinFormData) {
  const supabase = createServerClient();
  const password = formData.password;
  const hashPassword = await hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert({ ...formData, password: hashPassword });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signIn(formData: LoginFormData) {
  const supabase = createServerClient();

  const { email, password } = formData;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  const validPassword = await compare(password, data.password);

  if (!validPassword) {
    return { success: false, error: "비밀번호 일치하지 않습니다." };
  }

  // ---

  const session = {
    user: {
      id: data.id,
      email: data.email,
      name: data.name,
    },
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };

  const cookie = cookies();

  cookie.set("session", JSON.stringify(session), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true, user: session.user };
}
