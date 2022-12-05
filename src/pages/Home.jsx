import PokeDex from "../components/PokeDex";
import PokemonList from "../components/PokemonList";
import SearchPokemon from "../components/SearchPokemon";
import { useState, useEffect } from "react";
import {
  IMAGE_API_URL,
  OFFICIAL_ARTWORK_URL,
  POKEMON_API_URL,
} from "../data/api";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  // console.log(searchedPokeData);

  return (
    <div className="Home flex flex-col justify-center items-center space-y-6">
      <SearchPokemon
        setPokemonData={setPokemonData}
        pokemonData={pokemonData}
      />
      <PokemonList setPokemonData={setPokemonData} pokemonData={pokemonData} />
    </div>
  );
};

export default Home;
