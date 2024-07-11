"use client";

import useMypage from "@/zustand/mypageStore";
import React from "react";

const FavoritePokemon = () => {
  const { nickname, favoritePokemons } = useMypage();
  return (
    <div className="">
      <h2 className="text-2xl font-bold m-5">{nickname} 님이 찜한 포켓몬</h2>
      <div className="w-4/5 h-56 bg-[#f2f2f2] m-auto mt-5">
        {favoritePokemons.map((pokemon, index) => (
          <div key={index}>{pokemon}</div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePokemon;
