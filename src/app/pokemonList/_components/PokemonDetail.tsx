"use client"; // 이 줄을 추가하여 컴포넌트를 클라이언트 컴포넌트로 명시합니다.

import Loading from "@/app/components/Loading";
import type { Pokemon, EvolutionDetail } from "@/types/type.pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import detail_bg from "@/app/img/detail_bg.png";

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

  const [showAllMoves, setShowAllMoves] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (pokemon) {
      const currentIndex = pokemon.evolutionChain.findIndex(
        (evolution) => evolution.name === pokemon.name
      );
      setInitialSlide(currentIndex !== -1 ? currentIndex : 0);
    }
  }, [pokemon]);

  useEffect(() => {
    if (swiperRef.current && initialSlide !== 0) {
      swiperRef.current.slideTo(initialSlide, 0, false);
    }
  }, [initialSlide]);

  if (isPending || !pokemon) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>ERRRRRRRRRRRR</div>;
  }

  const createSlide = (pokeData: Pokemon | EvolutionDetail) => {
    const moves = pokeData.moves || [];
    const displayedMoves = showAllMoves ? moves : moves.slice(0, 15);

    return (
      <div
      className="pokemon-details bg-white text-black p-8 rounded-2xl mx-auto border-8 border-gray-300" // 테두리 추가
      style={{
          backgroundImage: `url(${detail_bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // fixed나 sticky 포지션을 사용하지 않도록 주의
        }}
      >
        <div className="info mb-4 text-center">
          No. <span className="font-bold">{pokeData.id}</span>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          {pokeData.korean_name}
        </h2>
        <div className="flex justify-center mb-6">
          <Image
            src={
              (pokeData as EvolutionDetail).image ||
              (pokeData as Pokemon).sprites.front_default
            }
            alt={pokeData.korean_name}
            width={150}
            height={150}
            sizes="(max-width: 600px) 100px, 150px"
          />
        </div>
        <div className="mb-2 text-gray-700 text-center">
          {pokeData.description}
        </div>

        <div className="info mb-4 text-center">
          <span className="font-bold">키: </span> {pokeData.height / 10} m{" "}
          <span className="font-bold">무게: </span> {pokeData.weight / 10} kg
        </div>
        <div className="info mb-6 text-center">
          <span className="font-bold">타입: </span>
          {pokeData.types?.map((typeInfo, index) => (
            <span
              key={index}
              className="type bg-orange-500 text-white py-1 px-2 rounded ml-2"
            >
              {typeInfo.type.korean_name}
            </span>
          ))}
          <span className="font-bold ml-4">특성: </span>
          {pokeData.abilities?.map((abilityInfo, index) => (
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
            {displayedMoves.map((moveInfo, index) => (
              <span
                key={index}
                className="block bg-gray-200 text-black py-1 px-2 rounded m-1"
              >
                {moveInfo.move.korean_name}
              </span>
            ))}
          </div>
          {moves.length > 15 && (
            <div className="text-center mt-8">
             <button 
             onClick={() => setShowAllMoves(!showAllMoves)}
             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors"
           >
              {showAllMoves ? "간단히 보기" : "더보기"}
            </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (initialSlide !== 0) {
            swiper.slideTo(initialSlide, 0, false);
          }
        }}
        initialSlide={initialSlide}
      >
        {pokemon.evolutionChain.map((evolution, index) => (
          <SwiperSlide key={index}>
            {createSlide(evolution as EvolutionDetail)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-8">
      </div>
    </div>
  );
};
