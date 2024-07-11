import React from "react";
import UserProfile from "./_components/UserProfile";
import FavoritePokemon from "./_components/FavoritePokemon";
import UserComments from "./_components/UserComments";

const MyPage = () => {
  return (
    <div className="m-auto">
      <UserProfile />
      <FavoritePokemon />
      <UserComments />
    </div>
  );
};

export default MyPage;
