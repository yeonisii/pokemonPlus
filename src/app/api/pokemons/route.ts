import { NextResponse } from 'next/server';
import axios from 'axios';

export const TOTAL_POKEMON = 151;
const PAGE_SIZE = 20;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * PAGE_SIZE;

  try {
    let responseData;
    if (searchParams.has('page')) {
      // 페이지네이션 요청일 경우
      const allPokemonPromises = Array.from({ length: PAGE_SIZE }, (_, index) => {
        const id = index + 1 + offset;
        if (id > TOTAL_POKEMON) return null;

        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }).filter(Boolean);

      const allPokemonResponses = await Promise.all(allPokemonPromises);

      const allPokemonData = allPokemonResponses.map(([response, speciesResponse]: any) => {
        const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === 'ko');
        return { ...response.data, korean_name: koreanName?.name || null };
      });

      const totalPages = Math.ceil(TOTAL_POKEMON / PAGE_SIZE);
      const hasNextPage = page < totalPages;

      responseData = {
        data: allPokemonData,
        totalPages,
        hasNextPage,
      };
    } else {
      // 전체 데이터 요청일 경우
      const allPokemonPromises = Array.from({ length: TOTAL_POKEMON }, (_, index) => {
        const id = index + 1;

        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      });

      const allPokemonResponses = await Promise.all(allPokemonPromises);

      const allPokemonData = allPokemonResponses.map(([response, speciesResponse]: any) => {
        const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === 'ko');
        return { ...response.data, korean_name: koreanName?.name || null };
      });

      responseData = {
        data: allPokemonData,
      };
    }

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
};
