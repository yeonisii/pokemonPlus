"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useMypage from "@/zustand/mypageStore";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

const UserProfile = () => {
  const { nickname, profileImage, setNickname, setProfileImage } = useMypage();
  const [userID, setUserId] = useState<string | null>(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  // 클라이언트 컴포넌트에서는 route handler를 이용하여 데이터를 fetch
  // 서버 컴포넌트에서는 route handler를 사용할 필요 없이 컴포넌트 내에서 api호출

  // 1. supabase authentication의 현재 로그인한 사용자의 id를 가져온다. ?? https://supabase.com/docs/reference/javascript/auth-getsession

  useEffect(() => {
    const getSession = async () => {
      const { data, error: err } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
      } else if (error) {
        console.error("에러가 발생했습니다", error);
      } else {
        console.log("세션 정보가 없습니다.");
      }
    };
    getSession();
  }, [supabase]);

  console.log(userID);

  // 2. 가져온 id로 user테이블의 같은 id를 찾는다.

  const getApiData = async () => {
    if (!userID) return null;
    try {
      const response = await fetch(`/api/user/${userID}`);
      if (!response.ok) {
        throw new Error("사용자 데이터를 가져오는 데 실패했습니다");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      return null;
    }
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userID],
    queryFn: getApiData,
    enabled: !userID,
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
