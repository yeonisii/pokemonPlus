import React from "react";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  img: string;
}

interface FavoritePokemonProps {
  nickname: string;
  favorites: Pokemon[];
}

const FavoritePokemon: React.FC<FavoritePokemonProps> = ({
  nickname,
  favorites,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{nickname}님이 찜한 포켓몬</h2>
      {favorites.length === 0 ? (
        <p>찜한 포켓몬이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {favorites.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <a className="border p-4 text-center block">
                <img src={pokemon.img} alt={pokemon.name} className="" />
                <div>{`No. ${pokemon.id}`}</div>
                <div>{pokemon.name}</div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePokemon;
