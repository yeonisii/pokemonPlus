"use client";

import React from "react";
import Image from "next/image";
import useMypage from "@/zustand/mypageStore";

const UserProfile = () => {
  const { nickname, profileImage } = useMypage();

  return (
    <div className="">
      <h2 className="text-2xl font-bold m-5">{nickname} 님의 페이지 </h2>
      <Image
        src={profileImage}
        alt="프로필사진"
        width={175}
        height={175}
        className="rounded-full mx-auto mt-4"
      />
    </div>
  );
};

export default UserProfile;
