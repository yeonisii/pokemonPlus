"use client";

import Loading from "@/app/components/Loading";
import type { Pokemon } from "@/types/type.pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PokemonDetail = ({ id }: { id: string }) => {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery<Pokemon>({
    queryKey: ["pokemonDetail", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/pokemons/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading || !pokemon) {
    return <Loading text="포켓몬아 안녕!" />;
  }

  if (error) {
    console.log(error);
    return <div>ERRRRRRRRRRRR</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="pokemon-details bg-white text-black p-8 rounded-lg mx-auto shadow-lg max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {pokemon.korean_name}
        </h2>
        <div className="mb-2 text-gray-700 text-center">
          {pokemon.description}
        </div>

        <div className="flex justify-center mb-6">
          {pokemon?.sprites?.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.korean_name}
              width={150}
              height={150}
            />
          )}
        </div>

        <div className="info mb-4 text-center">
          No. <span className="font-bold">{pokemon.id}</span>
        </div>
        <div className="info mb-4 text-center">
          <span className="font-bold">이름: </span> {pokemon.korean_name}
        </div>
        <div className="info mb-4 text-center">
          <span className="font-bold">키: </span> {pokemon.height / 10} m{" "}
          <span className="font-bold">무게: </span> {pokemon.weight / 10} kg
        </div>
        <div className="info mb-6 text-center">
          <span className="font-bold">타입: </span>
          {pokemon?.types?.map((typeInfo, index) => (
            <span
              key={index}
              className="type bg-orange-500 text-white py-1 px-2 rounded ml-2"
            >
              {typeInfo.type.korean_name}
            </span>
          ))}
          <span className="font-bold ml-4">특성: </span>
          {pokemon?.abilities?.map((abilityInfo, index) => (
            <span
              key={index}
              className="specialty bg-green-500 text-white py-1 px-2 rounded ml-2"
            >
              {abilityInfo.ability.korean_name}
            </span>
          ))}
        </div>
        <div className="description text-sm mb-6">
          <span className="font-bold">기술:</span>
          <div className="flex flex-wrap justify-center mt-2">
            {pokemon?.moves?.map((moveInfo, index) => (
              <span
                key={index}
                className="block bg-gray-200 text-black py-1 px-2 rounded m-1"
              >
                {moveInfo.move.korean_name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/pokemonList"
            className="back-button inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            뒤로 가기
          </Link>
        </div>
      </div>
    </div>
  );
};
