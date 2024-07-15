"use client";
import UserProfile from "./_components/UserProfile";
import FavoritePokemon from "./_components/FavoritePokemon";
import UserComments from "./_components/UserComments";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
// import { createClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/client";
import { getUserCookie } from "@/app/actions/cookie";

const MyPage = () => {
  const [userID, setUserId] = useState<string | null>(null);

  const supabase = createClient();
  // 클라이언트 컴포넌트에서는 route handler를 이용하여 데이터를 fetch
  // 서버 컴포넌트에서는 route handler를 사용할 필요 없이 컴포넌트 내에서 api호출

  // 1. supabase authentication의 현재 로그인한 사용자의 id를 가져온다. ?? https://supabase.com/docs/reference/javascript/auth-getsession

  useEffect(() => {
    const getSession = async () => {
      // const { data, error: err } = await supabase.auth.getSession();
      const userCookie = await getUserCookie();
      if (userCookie) {
        const myCookie = JSON.parse(userCookie);
        setUserId(myCookie.user.id);
      }

      // console.error("에러가 발생했습니다", error);
    };
    getSession();
  }, [supabase]);

  const getApiData = async () => {
    // if (!userID) return null;
    try {
      const response = await fetch(`/api/user/${userID}`);
      if (!response.ok) {
        throw new Error("사용자 데이터를 가져오는 데 실패했습니다");
      }
      const data = await response.json();
      console.log("getAPI Data Response ===>", data);
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
    // enabled: !userID,
  });

  // isPending 데이터가 없을 때? 해당 문구가 뜸 ==> 불러오고 있을 때 true 다 불러오면 false

  if (isPending) return <>Loading...</>;
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <div className="m-auto">
      <UserProfile userName={user?.data.name} />
      <FavoritePokemon userName={user?.data.name} />
      <UserComments userName={user?.data.name} />
    </div>
  );
};

export default MyPage;
