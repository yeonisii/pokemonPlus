"use client";

import React from "react";
import PokemonDetailCommentItem from "./PokemonDetailCommentItem";
import { allComments } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const PokemonDetailCommentList = ({ id }: { id: string }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["Allcomments"],
    queryFn: () => allComments(id),
  });

  if (isPending || !data) {
    <div>잠시만용~^.^</div>;
  }

  return (
    <ul>
      {/* TODO 맵으로 뿌리기 */}
      {data ? (
        data.map((pokemon) => (
          <PokemonDetailCommentItem key={pokemon.row} id={id} data={pokemon} />
        ))
      ) : (
        <PokemonDetailCommentItem id={id} data={null} />
      )}
    </ul>
  );
};

export default PokemonDetailCommentList;
