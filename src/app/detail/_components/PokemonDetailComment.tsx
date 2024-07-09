import { Bruno_Ace } from "next/font/google";
import React from "react";

const PokemonDetailComment = () => {
  return (
    <div>
      <div className="relative w-2/3 bg-white shadow-xl flex mx-auto rounded-xl mb-6 px-2">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="min-w-[100px] min-h-[100px] flex items-center justify-center border-2 rounded-full hidden sm:hidden md:hidden lg:block">
              이미지
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-2">
                <div>닉네임</div>
                <div>시간</div>
              </div>
              <div className="p-2 border-2">
                코멘트 내용을 엄청 길게코멘트 내용을 엄청 길게코멘트 내용을 엄청
                길게코멘트내용을엄청길게코멘트 내용을 엄청 길게코멘트 내용을
                엄청 길게코멘트 내용을 엄청 길게코멘트 내용을 엄청 길게코멘트
                내용을 엄청길게코멘트 내용을 엄청 길게코멘트 내용을 엄청
                길게코멘트 내용을엄청 길게
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {/* 본인만 보이게 할 것 */}
            <div className="flex gap-2 cursor-pointer whitespace-nowrap p-2">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <svg
          className="absolute w-[25%] h-[25%] right-[-12%] top-[33%] fill-[#ffffff] rotate-90"
          viewBox="0 0 100 100"
        >
          <polygon points="25,0 50,50 0,50" />
        </svg>
      </div>

      {/* 예시! 한 개 더 보일 때는 말꼬리를 반대로... */}
      <div className="relative w-2/3 bg-white shadow-xl flex mx-auto rounded-xl mb-4">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="min-w-[100px] min-h-[100px] flex items-center justify-center border-2 rounded-full hidden sm:hidden md:hidden lg:block transition-opacity duration-300 ease-in-out opacity-0 lg:opacity-100">
              이미지
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-2">
                <div>닉네임</div>
                <div>시간</div>
              </div>
              <div className="p-2 border-2">
                코멘트 내용을 엄청 길게코멘트 내용을 엄청 길게코멘트 내용을 엄청
                길게코멘트내용을엄청길게코멘트 내용을 엄청 길게코멘트 내용을
                엄청 길게코멘트 내용을 엄청 길게코멘트 내용을 엄청 길게코멘트
                내용을 엄청길게코멘트 내용을 엄청 길게코멘트 내용을 엄청
                길게코멘트 내용을엄청 길게
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {/* 본인만 보이게 할 것 */}
            <div className="flex gap-2 cursor-pointer whitespace-nowrap p-2">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <svg
          className="absolute w-[25%] h-[25%] left-[-12%] top-[33%] fill-[#ffffff] rotate-[270deg]"
          viewBox="0 0 100 100"
        >
          <polygon points="25,0 50,50 0,50" />
        </svg>
      </div>
    </div>
  );
};

export default PokemonDetailComment;
