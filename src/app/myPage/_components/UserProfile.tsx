"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useMypage from "@/zustand/mypageStore";
import pokeball from "../../img/pokeball1.png";

interface userNameProps {
  userName: string;
}

const UserProfile = ({ userName }: userNameProps) => {
  const { nickname, profileImage, setNickname, setProfileImage } = useMypage();

  // 2. 가져온 id로 user테이블의 같은 id를 찾는다.

  return (
    <div className="">
      <h2 className="text-2xl font-bold m-5">{userName} 님의 페이지 </h2>
      <Image
        src={profileImage || "/image/profile-pokemon.png"}
        alt="프로필사진"
        width={175}
        height={175}
        className="rounded-full mx-auto mt-4"
      />
    </div>
  );
};

export default UserProfile;
