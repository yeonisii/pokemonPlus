"use client";

import { deleteComment, updateComment, userInfo } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import { getUserCookie } from "@/app/actions/cookie";
import { Tables } from "@/types/supabase.users.types";

interface Comment {
  comment: string | null;
  created_at: string | null;
  nickname: string | null;
  pokemon_id: number | null;
  row: number | null;
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
  const [editComment, setEditComment] = useState<string>(
    comment?.comment || ""
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [myId, setMyId] = useState<string>("");
  const [userInform, setUserInform] = useState<Tables<"users">[]>([]);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const commentSupabaseDate: string | null | undefined = comment?.created_at;
  const commentDate = commentSupabaseDate?.slice(0, 16).replace("T", " ");

  useEffect(() => {
    let isMounted = true;

    const checkUserLogin = async () => {
      try {
        const cookieString = await getUserCookie();

        if (cookieString && isMounted) {
          const cookie = JSON.parse(cookieString);
          setMyId(cookie.user.id);
        } else if (isMounted) {
          console.log("쿠키가 없습니다.");
        }
      } catch (error) {
        if (isMounted) {
          console.error("쿠키 확인 중 오류 발생:", error);
        }
      }
    };
    checkUserLogin();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUserInfo = async () => {
      if (myId) {
        try {
          const userData = await userInfo(myId);
          if (isMounted) {
            if (userData && userData.length > 0) {
              setUserInform(userData);
            } else {
              console.log("사용자 정보가 없습니다.");
            }
          }
        } catch (error) {
          if (isMounted) {
            console.error("유저 정보 가져오기 실패:", error);
          }
        }
      }
    };
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [myId]);

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allcomments", id] });
      toast("🦄 댓글이 삭제되었습니다!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  const removeComment = () => {
    deleteMutation.mutate({ row: comment?.row, userId: myId });
  };

  const OnClickEditBtn = () => {
    setIsEditing(true);
  };

  const editMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allcomments", id] });
    },
  });

  const handleSaveButton = () => {
    editMutation.mutate({ comment: editComment, id: myId, row: comment?.row });
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
                <div className="mr-8">{comment.nickname}</div>
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
          {myId === comment?.user_id && !isEditing && (
            <div className="flex gap-2 cursor-pointer whitespace-nowrap p-2">
              <button onClick={OnClickEditBtn}>수정</button>
              <button onClick={removeComment}>삭제</button>
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
