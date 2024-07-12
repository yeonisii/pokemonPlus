import { NextResponse } from "next/server";
import axios from "axios";

// 데이터 변환 로직을 별도의 함수로 분리
const getPokemonData = async (id: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );

  const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
  const evolutionResponse = await axios.get(evolutionChainUrl);

  const koreanName = speciesResponse.data.names?.find(
    (name: any) => name.language.name === "ko"
  );

  const description =
    speciesResponse.data.flavor_text_entries?.find(
      (entry: any) => entry.language.name === "ko"
    )?.flavor_text || "No description available";

  const typesWithKoreanNames = await Promise.all(
    response.data.types.map(async (type: any) => {
      const typeResponse = await axios.get(type.type.url);
      const koreanTypeName =
        typeResponse.data.names?.find(
          (name: any) => name.language.name === "ko"
        )?.name || type.type.name;
      return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
    })
  );

  const abilitiesWithKoreanNames = await Promise.all(
    response.data.abilities.map(async (ability: any) => {
      const abilityResponse = await axios.get(ability.ability.url);
      const koreanAbilityName =
        abilityResponse.data.names?.find(
          (name: any) => name.language.name === "ko"
        )?.name || ability.ability.name;
      return {
        ...ability,
        ability: { ...ability.ability, korean_name: koreanAbilityName },
      };
    })
  );

  const movesWithKoreanNames = await Promise.all(
    response.data.moves.map(async (move: any) => {
      const moveResponse = await axios.get(move.move.url);
      const koreanMoveName =
        moveResponse.data.names?.find(
          (name: any) => name.language.name === "ko"
        )?.name || move.move.name;
      return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
    })
  );

  const extractEvolutionChain = async (evolutionData: any) => {
    let evolutionChain = [];
    let current = evolutionData.chain;

    while (current) {
      const speciesName = current.species.name;
      const speciesResponse = await axios.get(current.species.url);
      const speciesKoreanName =
        speciesResponse.data.names?.find(
          (name: any) => name.language.name === "ko"
        )?.name || speciesName;

      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${speciesName}`
      );
      const pokemonImage = pokemonResponse.data.sprites.front_default;

      const moves = await Promise.all(
        pokemonResponse.data.moves.map(async (move: any) => {
          const moveResponse = await axios.get(move.move.url);
          const koreanMoveName =
            moveResponse.data.names?.find(
              (name: any) => name.language.name === "ko"
            )?.name || move.move.name;
          return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
        })
      );

      const types = await Promise.all(
        pokemonResponse.data.types.map(async (type: any) => {
          const typeResponse = await axios.get(type.type.url);
          const koreanTypeName =
            typeResponse.data.names?.find(
              (name: any) => name.language.name === "ko"
            )?.name || type.type.name;
          return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
        })
      );

      const abilities = await Promise.all(
        pokemonResponse.data.abilities.map(async (ability: any) => {
          const abilityResponse = await axios.get(ability.ability.url);
          const koreanAbilityName =
            abilityResponse.data.names?.find(
              (name: any) => name.language.name === "ko"
            )?.name || ability.ability.name;
          return {
            ...ability,
            ability: { ...ability.ability, korean_name: koreanAbilityName },
          };
        })
      );

      const evolutionDescription =
        speciesResponse.data.flavor_text_entries?.find(
          (entry: any) => entry.language.name === "ko"
        )?.flavor_text || "No description available";

      evolutionChain.push({
        name: speciesName,
        korean_name: speciesKoreanName,
        image: pokemonImage,
        description: evolutionDescription,
        moves: moves,
        id: pokemonResponse.data.id,
        height: pokemonResponse.data.height,
        weight: pokemonResponse.data.weight,
        types: types,
        abilities: abilities,
      });

      if (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
      } else {
        current = null;
      }
    }

    return evolutionChain;
  };

  const evolutionChain = await extractEvolutionChain(evolutionResponse.data);

  return {
    ...response.data,
    korean_name: koreanName?.name || response.data.name,
    description,
    types: typesWithKoreanNames,
    abilities: abilitiesWithKoreanNames,
    moves: movesWithKoreanNames,
    evolutionChain,
  };
};

// 에러 처리 및 데이터 변환 로직을 호출하는 GET 함수
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const pokemonData = await getPokemonData(id);
    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error); // 에러 처리 개선
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
