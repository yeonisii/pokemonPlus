"use client";

import { createClient } from "./client";

const supabase = createClient();

// 유저 정보 불러오기
export const userInfo = async (id: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log("유저 정보 불러오기 실패", error);
  }
  return users;
};

//댓글 불러오기
export const allComments = async (id: string) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("pokemon_id", id);

  if (error) {
    console.log("불러오기 실패!", error);
  }

  // 빈 배열일 때 null 반환
  if (comments?.length === 0) {
    return null;
  }

  return comments;
};

//댓글 추가
export const addComment = async (newComment) => {
  const { data, error } = await supabase
    .from("comments")
    .insert(newComment)
    .select();

  if (error) {
    console.log("댓글 추가 에러", error);
  }

  return data;
};

//댓글 수정
export const updateComment = async (comment, id) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ comment })
    .eq("user_id", id)
    .select();

  if (error) {
    console.log("수정 에러", error);
  }

  return data;
};

//댓글 삭제
export const deleteComment = async (userId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.log("삭제 에러", error);
  }

  return console.log("삭제 성공");
};
