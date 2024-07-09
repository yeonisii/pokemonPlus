import { Bruno_Ace } from "next/font/google";
import React from "react";

const PokemonDetailComment = () => {
  return (
    <div>
      <div className="relative bg-white shadow-xl w-1/2 flex mx-auto rounded-xl mb-4">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-8">
            <div> 이미지</div>
            <div className="flex flex-col gap-2">
              <div>닉네임</div>
              <div>코멘트 내용</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>시간</div>
            {/* 본인만 보이게 할 것 */}
            <div className="flex gap-2 cursor-pointer">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <svg
          className="absolute w-[25%] h-[25%] right-[-13%] top-[33%] fill-[#ffffff] rotate-90"
          viewBox="0 0 100 100"
        >
          <polygon points="50,0 100,100 0,100" />
        </svg>
      </div>

      <div className="relative bg-white shadow-xl w-1/2 flex mx-auto rounded-xl">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-8">
            <div> 이미지</div>
            <div className="flex flex-col gap-2">
              <div>닉네임</div>
              <div>코멘트 내용</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>시간</div>
            {/* 본인만 보이게 할 것 */}
            <div className="flex gap-2 cursor-pointer">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <svg
          className="absolute w-[25%] h-[25%] left-[-13%] top-[33%] fill-[#ffffff] rotate-[270deg]"
          viewBox="0 0 100 100"
        >
          <polygon points="50,0 100,100 0,100" />
        </svg>
      </div>
    </div>
  );
};

export default PokemonDetailComment;
