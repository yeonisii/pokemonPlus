import React from "react";
import PokemonDetailCommentList from "./_components/PokemonDetailCommentList";
import PokemonDetailCommentForm from "./_components/PokemonDetailCommentForm";

const DeatilPage = () => {
  return (
    <div className="bg-gray-300 h-[100vh] p-4 w-2/3 mx-auto">
      <PokemonDetailCommentForm />
      <PokemonDetailCommentList />
    </div>
  );
};

export default DeatilPage;
