"use client";

import { deleteComment, updateComment } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { useState } from "react";

interface Comment {
  comment: string | null;
  created_at: string | null;
  // TODO 임시값 수정할 것
  nickname: string | null;
  pokemon_id: number | null;
  row: number | null;
  // TODO 임시 값 수정할 것
  user_id: string | null;
}

interface PokemonDetailCommentItemProps {
  id: string;
  comment: Comment | null;
  index: number;
}

const PokemonDetailCommentItem = ({
  id,
  comment,
  index,
}: PokemonDetailCommentItemProps) => {
  const [editComment, setEditComment] = useState(comment?.comment || "");
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  console.log(comment);

  const commentSupabaseDate: string | null | undefined = comment?.created_at;
  const commentDate = commentSupabaseDate?.slice(0, 16).replace("T", " ");

  // TODO userId 확인
  // const deleteMutation = useMutation({
  //   mutationFn: deleteComment,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["Allcomments", id] });
  //  toast("🦄 댓글이 삭제되었습니다!", {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   transition: Bounce,
  // });
  //   },
  // });

  // const removeComment = () => {
  //   deleteMutation.mutate(userId);
  // };

  // TODO userId 확인 쥬스탠드로 확인 하고 수정 버튼 누를 수 있게끔 하기. user 정보랑 comment.user_id랑 비교 탄스택으로 바꾸기~~~
  const OnClickEditBtn = () => {
    setIsEditing(true);
  };

  // const editMutation = useMutation({
  //   mutationFn: (
  //     comment,
  //     userId: {
  //       // TODO 여기 두 개 받아오면 어떻게 타입 쓰는지 정리!
  //       editComment;
  //     }
  //   ) => updateComment(comment, userId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["Allcomments", id] });
  //   },
  // });

  const handleSaveButton = () => {
    // TODO : id 받아와서 바꾸기
    // editMutation.mutate(editComment, userId)
    setIsEditing(false);
    toast("🦄 댓글이 수정되었습니다!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (comment === null) {
    return (
      <div className="flex mx-auto justify-center">
        댓글이 없어요, 첫 댓글을 작성해보세요!{" "}
        <MdOutlineCatchingPokemon className="mt-1" />
      </div>
    );
  }

  return (
    <div className="border-t-2 w-5/6 flex mx-auto flex-col">
      <div className="relative w-full bg-blue-100 shadow-xl rounded-xl my-6 px-2">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="min-w-[100px] min-h-[100px] flex items-center justify-center border-2 border-slate-500 rounded-full hidden sm:hidden md:hidden lg:block">
              이미지
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-2">
                {/* TODO 닉네임으로 바꾸기 */}
                <div className="mr-8">닉네임</div>
                <div>{commentDate}</div>
              </div>
              <div className="p-2 border-2 w-full">
                {isEditing ? (
                  <div className="flex w-full justify-between">
                    <input
                      type="text"
                      value={editComment}
                      onChange={(event) => setEditComment(event.target.value)}
                      className="w-full p-1 border rounded mr-4"
                    />
                    <button
                      onClick={handleSaveButton}
                      className="px-4 py-1 bg-blue-500 text-white rounded whitespace-nowrap"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="w-full">{comment?.comment}</div>
                )}
              </div>
            </div>
          </div>
          {!isEditing && (
            <div className="flex gap-2 cursor-pointer whitespace-nowrap p-2">
              <button onClick={OnClickEditBtn}>수정</button>
              <button>삭제</button>
            </div>
          )}
        </div>
        <svg
          className={`absolute w-[25%] h-[25%] top-[33%] fill-[#DBE9FE] ${
            index % 2 === 0
              ? "right-[-12%] rotate-90"
              : "left-[-12%] rotate-[270deg]"
          }`}
          viewBox="0 0 100 100"
        >
          <polygon points="25,0 50,50 0,50" />
        </svg>
      </div>
    </div>
  );
};

export default PokemonDetailCommentItem;
