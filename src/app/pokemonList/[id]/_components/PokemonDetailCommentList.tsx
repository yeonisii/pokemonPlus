"use client";

import React from "react";
import PokemonDetailCommentItem from "./PokemonDetailCommentItem";
import { allComments } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const PokemonDetailCommentList = ({ id }: { id: string }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["Allcomments", id],
    queryFn: () => allComments(id),
  });

  if (isPending || !data) {
    <div>잠시만용~^.^</div>;
  }

  return (
    <ul>
      {/* TODO 댓글 맵으로 뿌리기 */}
      {data ? (
        data.map((comment, index) => (
          <PokemonDetailCommentItem
            key={comment.row}
            id={id}
            comment={comment}
            index={index}
          />
        ))
      ) : (
        <PokemonDetailCommentItem id={id} comment={null} index={0} />
      )}
    </ul>
  );
};

export default PokemonDetailCommentList;
