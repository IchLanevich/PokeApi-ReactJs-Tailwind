import axios, { all } from "axios";
import { useState, useEffect } from "react";
import {
  IMAGE_API_URL,
  OFFICIAL_ARTWORK_URL,
  POKEMON_API_URL,
} from "../../data/api";
import PokemonCard from "./pokemon_list_components/PokemonCard";
import { iconType } from "../../utils/utils";

const PokemonList = ({ setPokemonData, pokemonData }) => {
  const [currentUrl, setCurrentUrl] = useState(POKEMON_API_URL);
  const [previousUrl, setPreviousUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(currentUrl);
    const { results } = res.data;
    setNextUrl(res.data.next);
    setPreviousUrl(res.data.previous);

    const pokemonUrls = [];
    const pokemonObjUrls = results.forEach((item) => {
      pokemonUrls.push(item.url);
    });

    const pokemons = pokemonUrls.map(async (url) => {
      return await axios.get(url);
    });

    const newPokemonData = [];

    const settled = await Promise.allSettled(pokemons);
    settled.forEach((item) => {
      if (item.status === "fulfilled") {
        newPokemonData.push(item.value.data);
      }
    });

    setPokemonData(newPokemonData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentUrl]);
  // flex flex-wrap justify-center gap-2 md:gap-3 items-start
  return (
    <div className="container flex flex-col gap-4 px-2">
      <div className="pokemon-list grid grid-cols-2 gap-2 justify-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 md:gap-3 grid-flow-row min-h-[648px]">
        {isLoading ? (
          <h1></h1>
        ) : (
          pokemonData.map((pokemon) => {
            return (
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                sprites={pokemon.sprites}
                iconType={iconType}
                key={pokemon.id}
              />
            );
          })
        )}
      </div>
      <div className="pagination-wrapper flex gap-4 justify-center mb-12">
        {previousUrl && (
          <button
            className="bg-darkLight hover:bg-darkLight/75 active:bg-darkLight/50 px-4 py-2 rounded-md text-white"
            onClick={() => {
              setPokemonData([]);
              setCurrentUrl(previousUrl);
            }}
          >
            Previous
          </button>
        )}
        <button
          className="bg-darkLight hover:bg-darkLight/75 active:bg-darkLight/50 px-4 py-2 rounded-md text-white"
          onClick={() => {
            setPokemonData([]);
            setCurrentUrl(nextUrl);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
