import PokemonList from "../components/home_components/PokemonList";
import SearchPokemon from "../components/home_components/SearchPokemon";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);

  return (
    <>
      <Navbar />
      <div className="Home flex flex-col justify-center items-center space-y-6">
        <SearchPokemon
          setPokemonData={setPokemonData}
          pokemonData={pokemonData}
        />
        <PokemonList
          setPokemonData={setPokemonData}
          pokemonData={pokemonData}
        />
      </div>
    </>
  );
};

export default Home;
