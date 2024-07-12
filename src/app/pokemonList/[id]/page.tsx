import { PokemonDetail } from "../_components/PokemonDetail";
import PokemonDetailCommentForm from "./_components/PokemonDetailCommentForm";
import PokemonDetailCommentList from "./_components/PokemonDetailCommentList";

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
      description: "포켓몬 상세 정보",
    };
  }
}

const PokemonDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  return (
    <>
      <PokemonDetail id={id} />
      <div className="bg-gray-300 h-[100vh] p-4 w-2/3 mx-auto">
        <PokemonDetailCommentForm id={id} />
        <PokemonDetailCommentList id={id} />
      </div>
    </>
  );
};

export default PokemonDetailPage;
