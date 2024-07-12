"use client";

import useMypage from "@/zustand/mypageStore";
import React from "react";

const UserComments = () => {
  const { nickname, comments } = useMypage();

  return (
    <div className="mt-9">
      <h2 className="text-2xl font-bold m-5">{nickname} 님이 작성한 댓글</h2>
      <div className="w-4/5 h-56 bg-[#f2f2f2] m-auto mt-5">
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default UserComments;
