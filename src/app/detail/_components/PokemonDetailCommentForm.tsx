"use client";

import React, { useState } from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";

const PokemonDetailCommentForm = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="flex border-b-2 w-5/6 justify-center p-2">
        <MdOutlineCatchingPokemon className="mt-1" />
        포켓몬에 대해 이야기 나눠보세요{" "}
        <MdOutlineCatchingPokemon className="mt-1" />
      </h1>
      <div className="flex justify-center p-4 m-4 border-2 w-5/6 rounded-xl bg-white">
        <form className="flex gap-4 w-full">
          <input
            type="text"
            id="comment"
            placeholder="포켓몬에 대해 자유롭게 의견을 말해주세요"
            className="flex-grow min-w-0 p-2 border rounded h-[100px]"
          />
          <button className="whitespace-nowrap font-bold">등록</button>
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
