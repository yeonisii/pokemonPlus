import { PokemonDetail } from "../_components/PokemonDetail";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  try {
    const res = await fetch(
      `https://sparta-my-pok-mon-book-xvzw.vercel.app/api/pokemons/${id}`
    );
    const data = await res.json();
    return {
      title: data.korean_name,
      description: `${data.korean_name}의 정보이다`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error); // 에러 로그 개선
    return {
      title: "Pokemon",
      description: "포켓몬 상세 정보"
    };
  }
}

const PokemonDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return <PokemonDetail id={id} />; // 불필요한 Fragment 제거
};

export default PokemonDetailPage;
