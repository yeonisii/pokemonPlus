"use client";

import React from "react";
import Image from "next/image";
import useMypage from "@/zustand/mypageStore";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const { nickname, profileImage } = useMypage();
  // 클라이언트 컴포넌트에서는 route handler를 이용하여 데이터를 fetch
  // 서버 컴포넌트에서는 route handler를 사용할 필요 없이 컴포넌트 내에서 api호출

  // 1. supabase authentication의 현재 로그인한 사용자의 id를 가져온다. ?? https://supabase.com/docs/reference/javascript/auth-getsession

  // 2. 가져온 id로 user테이블의 같은 id를 찾는다.

  const getApiData = async () => {
    const { data } = await fetch(`/api/users`).then((res) => res.json());
    return data;
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getApiData,
  });

  // isPending 데이터가 없을 때? 해당 문구가 뜸 ==> 불러오고 있을 때 true 다 불러오면 false

  if (isPending) return <>Loading...</>;
  if (error) {
    console.log(error);
    return null;
  }

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
