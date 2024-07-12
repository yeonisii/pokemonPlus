"use client";

import { addComment } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PokemonDetailCommentForm = ({ id }: { id: string }) => {
  // TODO formData로 바꾸기
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn:
      // TODO 임시 값
      (newComment: {
        user_id: null;
        nickname: null;
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
      // TODO 임시값
      user_id: null,
      nickname: null,
      pokemon_id: id,
      comment,
    };
    addMutation.mutate(newComment);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="flex border-b-2 w-5/6 justify-center p-2">
        <MdOutlineCatchingPokemon className="mt-1" />
        포켓몬에 대해 이야기 나눠보세요{" "}
        <MdOutlineCatchingPokemon className="mt-1" />
      </h1>
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
        {/* TODO: 로그인 안 되어있으면  + Link 달기 */}
        {/* <div className="relative w-full bg-white">
            <input
              type="text"
              className="w-full p-2 border rounded opacity-0 h-[100px]"
              disabled
            />
            <div className="absolute inset-0 flex items-center pl-2 text-gray-400 pointer-events-none">
              댓글을 작성하려면
              <span className="underline decoration-1 ml-1">로그인 </span>
              해주세요
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default PokemonDetailCommentForm;
