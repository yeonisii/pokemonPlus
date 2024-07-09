export type EvolutionDetail = {
  name: string;
  korean_name: string;
  image: string;
};

export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
  description: string; //포켓몬 설명 불러오기
  evolutionChain: EvolutionDetail[];  //진화 체인 속성 불러오기
};
