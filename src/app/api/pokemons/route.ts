/* eslint-disable */

import { NextResponse } from "next/server";
import axios from "axios";

const TOTAL_POKEMON: number = 151;
const PAGE_SIZE: number = 20;

// 데이터를 가져오고 변환하는 로직을 별도의 함수로 분리
const fetchPokemonData = async (id: number) => {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
  ]);

  const koreanName = speciesResponse.data.names.find(
    (name: any) => name.language.name === "ko"
  );

  return { ...pokemonResponse.data, korean_name: koreanName?.name || null };
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * PAGE_SIZE;

  try {
    let responseData;

    if (searchParams.has("page")) {
      // 페이지네이션 요청일 경우
      const allPokemonPromises = Array.from(
        { length: PAGE_SIZE },
        (_, index) => {
          const id = index + 1 + offset;
          if (id > TOTAL_POKEMON) return null;

          return fetchPokemonData(id); // 데이터 변환 로직 호출
        }
      ).filter(Boolean);

      const allPokemonData = await Promise.all(allPokemonPromises);

      const totalPages = Math.ceil(TOTAL_POKEMON / PAGE_SIZE);
      const hasNextPage = page < totalPages;

      responseData = {
        data: allPokemonData,
        totalPages,
        hasNextPage,
      };
    } else {
      // 전체 데이터 요청일 경우
      const allPokemonPromises = Array.from(
        { length: TOTAL_POKEMON },
        (_, index) => {
          const id = index + 1;
          return fetchPokemonData(id); // 데이터 변환 로직 호출
        }
      );

      const allPokemonData = await Promise.all(allPokemonPromises);

      responseData = {
        data: allPokemonData,
      };
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error); // 에러 로그 개선
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
