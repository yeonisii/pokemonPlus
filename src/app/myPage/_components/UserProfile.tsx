import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const nickname = "yeoni";
  const profileimage = "images/profile-pokemon.png";

  return (
    <div className="mb-3">
      <h1 className="text-2xl font-bold	">{nickname}님의 페이지 </h1>
      <img
        src={profileimage}
        alt="프로필사진"
        width={128}
        height={128}
        className="rounded-full mx-auto mb-4"
      />
    </div>
  );
};

export default UserProfile;
