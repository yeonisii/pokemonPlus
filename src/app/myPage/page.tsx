import React from "react";
import UserProfile from "./_components/UserProfile";
import FavoritePokemon from "./_components/FavoritePokemon";
import UserComments from "./_components/UserComments";
import Sidevar from "../components/Sidevar";

const MyPage = () => {
  return (
    <div className="m-auto">
      <Sidevar />
      <UserProfile />
      <FavoritePokemon />
      <UserComments />
    </div>
  );
};

export default MyPage;
