import { createClient } from "./client";

const supabase = createClient();

//댓글 불러오기
export const allComments = async () => {
  const { data: comments, error } = await supabase.from("comments").select("*");

  if (error) {
    console.log("불러오기 실패!", error);
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
export const updateComment = async (updateComment, id) => {
  const { data, error } = await supabase
    .from("comments")
    .update(updateComment)
    .eq("user_id", id)
    .select();

  if (error) {
    console.log("수정 에러", error);
  }

  return data;
};

//댓글 삭제
export const deleteComment = async (id) => {
  const { error } = await supabase.from("comments").delete().eq("user_id", id);

  if (error) {
    console.log("삭제 에러", error);
  }

  return console.log("삭제 성공");
};
