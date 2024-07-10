"use client";

import React from "react";

interface Comment {
  comment: string;
  created_at: string;
  // TODO 임시값 수정할 것
  nickname: string | null;
  pokemon_id: number;
  row: number;
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
  // TODO CSS 할 것...
  if (comment === null) {
    return <div> 댓글이 없어용 </div>;
  }

  console.log(id);
  console.log(index % 2);
  console.log(comment);

  // TODO created_at 날짜 수정하기!

  return (
    <div className="border-t-2 w-5/6 flex mx-auto flex-col">
      <div className="relative w-full bg-white shadow-xl rounded-xl my-6 px-2">
        <div className="flex p-4 justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="min-w-[100px] min-h-[100px] flex items-center justify-center border-2 rounded-full hidden sm:hidden md:hidden lg:block">
              이미지
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-2">
                <div>닉네임</div>
                <div>{comment?.created_at}</div>
              </div>
              <div className="p-2 border-2">{comment?.comment}</div>
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
          className={`absolute w-[25%] h-[25%] top-[33%] fill-[#ffffff] 
          ${
            index % 2 === 0
              ? "right-[-12%] rotate-90"
              : "left-[-12%] rotate-[270deg]"
          }`}
          viewBox="0 0 100 100"
        />
      </div>

      {/* 예시! 한 개 더 보일 때는 말꼬리를 반대로... */}
      {/* <div className="relative w-full bg-white shadow-xl flex mx-auto rounded-xl mb-4">
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
              <div className="p-2 border-2">포켓몬 귀여와</div>
            </div>
          </div>
          <div className="flex gap-4"> */}

      {/* 본인만 보이게 할 것 */}
      {/* <div className="flex gap-2 cursor-pointer whitespace-nowrap p-2">
              <button>수정</button>
              <button>삭제</button>
            </div> */}

      {/* </div>
        </div>
        <svg
          className="absolute w-[25%] h-[25%] top-[33%] fill-[#ffffff] left-[-12%] rotate-[270deg]"
          viewBox="0 0 100 100"
        >
          <polygon points="25,0 50,50 0,50" />
        </svg>
      </div> */}
    </div>
  );
};

export default PokemonDetailCommentItem;
