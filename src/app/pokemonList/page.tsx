"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import type { Pokemon } from "@/types/type.pokemon";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../components/Pagination";
import onLike from "../../../public/full_love.svg";
import offLike from "../../../public/bin_love.svg";
import Loading from "../components/Loading";

const ITEMS_PER_PAGE: number = 20;

const PokemonPage = () => {
  const [page, setPage] = useState<number>(1);
  const [likedPokemons, setLikedPokemons] = useState<number[]>([]);

  const { data, isPending, error } = useQuery<{
    data: Pokemon[];
    hasNextPage: boolean;
    totalPages: number;
  }>({
    queryKey: ["pokemons", page],
    queryFn: async (): Promise<{
      data: Pokemon[];
      hasNextPage: boolean;
      totalPages: number;
    }> => {
      const res = await axios.get(`/api/pokemons?page=${page}`);
      const { data, hasNextPage, totalPages } = res.data;
      return { data, hasNextPage, totalPages };
    },
  });

  if (isPending || !data) {
    return <Loading />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const totalPages: number = Math.ceil(151 / ITEMS_PER_PAGE);

  const toggleLike = (pokemonId: number) => {
    if (likedPokemons.includes(pokemonId)) {
      setLikedPokemons(likedPokemons.filter((id) => id !== pokemonId));
    } else {
      setLikedPokemons([...likedPokemons, pokemonId]);
    }
  };

  return (
    <div className="flex flex-col items-center h-dvh">
      <h1 className="text-3xl text-center font-bold mt-4 mb-8">Pokémon</h1>
      <ul className="grid gap-6 justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
        {data.data.map((item) => (
          <li
            key={item.id}
            className="relative flex flex-col items-center p-4 bg-white border-2 border-solid border-gray-200 rounded-lg shadow-md hover:shadow-lg"
            style={{ maxWidth: "200px" }}
          >
            <Link href={`/pokemonList/${item.id}`}>
              <div className="text-lg font-bold mb-2">No. {item.id}</div>
              <div className="relative w-32 h-32 mb-2">
                <Image
                  src={item.sprites.front_default}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-sm text-center font-bold">
                {item.korean_name}
              </div>
            </Link>
            <button
              onClick={() => toggleLike(item.id)}
              className="absolute top-2 right-2 p-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 focus:outline-none transform hover:scale-105 transition duration-300"
            >
              {likedPokemons.includes(item.id) ? (
                <Image
                  src={onLike}
                  alt="좋아요 활성화"
                  width={30}
                  height={30}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  src={offLike}
                  alt="좋아요 비활성화"
                  width={30}
                  height={30}
                  className="w-6 h-6"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default PokemonPage;
