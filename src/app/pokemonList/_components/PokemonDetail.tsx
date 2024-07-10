"use client";

import Loading from "@/app/components/Loading";
import type { Pokemon, EvolutionDetail } from "@/types/type.pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Swiper.js import 추가
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LoadingComponent from "@/app/components/Loading";

export const PokemonDetail = ({ id }: { id: string }) => {
  const {
    data: pokemon,
    isPending,
    error,
  } = useQuery<Pokemon>({
    queryKey: ["pokemonDetail", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/pokemons/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isPending || !pokemon) {
    return <LoadingComponent />;
  }

  if (error) {
    console.log(error);
    return <div>ERRRRRRRRRRRR</div>;
  }

  console.log(pokemon.korean_name);
  

  return (
    <div className="container mx-auto p-4">
      <div className="pokemon-details bg-white text-black p-8 rounded-lg mx-auto shadow-lg max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {pokemon.korean_name}
        </h2>
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
        <div className="mb-2 text-gray-700 text-center">
          {pokemon.description}
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
        {/* Swiper.js 사용하여 진화 과정 표시 */}
        <div className="evolution text-sm mb-6">
          <span className="font-bold">진화 과정:</span>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {pokemon?.evolutionChain?.map(
              (evolution: EvolutionDetail, index) => (
                <SwiperSlide key={index}>
                  <div className="evolution-stage text-center">
                    <Image
                      src={evolution.image}
                      alt={evolution.korean_name}
                      width={100}
                      height={100}
                    />
                    <div className="text-lg font-bold">
                      {evolution.korean_name}
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
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
