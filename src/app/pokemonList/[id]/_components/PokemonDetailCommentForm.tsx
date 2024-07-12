"use client";

import { getUserCookie } from "@/app/actions/cookie";
import { Tables } from "@/types/supabase.users.types";
import { addComment, userInfo } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PokemonDetailCommentForm = ({ id }: { id: string }) => {
  const [comment, setComment] = useState<string>("");
  const [myLoginId, setMyLoginId] = useState<string>("");
  const [userInfor, setUserInfor] = useState<Tables<"users">[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;

    const checkUserLogin = async () => {
      try {
        const cookieString = await getUserCookie();

        if (cookieString && isMounted) {
          const cookie = JSON.parse(cookieString);
          setMyLoginId(cookie.user.id);
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
      if (myLoginId) {
        try {
          const userData = await userInfo(myLoginId);
          if (isMounted) {
            if (userData && userData.length > 0) {
              setUserInfor(userData);
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
  }, [myLoginId]);

  const addMutation = useMutation({
    mutationFn: (newComment: {
      user_id: string;
      nickname: string;
      pokemon_id: string;
      comment: string;
    }) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allcomments", id] });
      setComment("");
      toast("🦄 댓글이 작성되었습니다!", {
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

  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      user_id: myLoginId,
      nickname: userInfor[0].name,
      pokemon_id: id,
      comment,
    };
    addMutation.mutate(newComment);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="flex border-b-2 w-5/6 justify-center p-2">
        <MdOutlineCatchingPokemon className="mt-1" />
        포켓몬에 대해 이야기 나눠보세요{" "}
        <MdOutlineCatchingPokemon className="mt-1" />
      </h1>
      {myLoginId ? (
        <div className="flex justify-center p-4 m-4 border-2 w-5/6 rounded-xl bg-white">
          <form
            className="flex gap-4 w-full items-center"
            onSubmit={submitComment}
          >
            <input
              type="text"
              id="comment"
              placeholder="포켓몬에 대해 자유롭게 의견을 말해주세요"
              className="flex-grow min-w-0 p-2 border rounded h-[100px]"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <button className="whitespace-nowrap font-bold px-4 py-2 bg-blue-500 text-white rounded h-auto">
              등록
            </button>
          </form>
        </div>
      ) : (
        <Link href={"/sign-in"} className="cursor-pointer w-full">
          <div className="relative w-full bg-white my-4">
            <input
              type="text"
              className="w-full p-2 border rounded opacity-0 h-[100px]"
              disabled
            />
            <div className="absolute inset-0 flex items-center pl-2 text-gray-400 border-2 mx-auto w-[83%]">
              댓글을 작성하려면{" "}
              <span className="underline decoration-1 ml-1">로그인</span>{" "}
              해주세요
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PokemonDetailCommentForm;
