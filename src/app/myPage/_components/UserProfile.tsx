"use client";

import React from "react";
import Image from "next/image";
import useMypage from "@/zustand/mypageStore";
import pokeball from "../../img/pokeball1.png";

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
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex flex-col items-center">
          <Image src={pokeball} alt="Change Nickname" width={50} height={50} />
          <p className="text-sm">닉네임 변경</p>
        </div>

        <div className="flex flex-col items-center">
          <Image src={pokeball} alt="Withdraw" width={50} height={50} />
          <p className="text-sm text-red-500">회원 탈퇴</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
