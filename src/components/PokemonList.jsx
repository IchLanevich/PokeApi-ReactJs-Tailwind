import axios, { all } from "axios";
import { useState, useEffect } from "react";
import {
  IMAGE_API_URL,
  OFFICIAL_ARTWORK_URL,
  POKEMON_API_URL,
} from "../data/api";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ searchedPokeData, setPokemonData, pokemonData }) => {
  // const [pokemonData, setPokemonData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(POKEMON_API_URL);
  const [previousUrl, setPreviousUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
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
    settled.forEach((item, index) => {
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

  const iconPath = "public/assets/pokemon_types_icon/IconSvg/";
  const iconExtension = ".svg";
  const iconType = {
    bug: `${iconPath}Pokemon_Type_Icon_bug${iconExtension}`,
    dark: `${iconPath}Pokemon_Type_Icon_dark${iconExtension}`,
    dragon: `${iconPath}Pokemon_Type_Icon_dragon${iconExtension}`,
    electric: `${iconPath}Pokemon_Type_Icon_electric${iconExtension}`,
    fairy: `${iconPath}Pokemon_Type_Icon_fairy${iconExtension}`,
    fighting: `${iconPath}Pokemon_Type_Icon_fighting${iconExtension}`,
    fire: `${iconPath}Pokemon_Type_Icon_fire${iconExtension}`,
    flying: `${iconPath}Pokemon_Type_Icon_flying${iconExtension}`,
    ghost: `${iconPath}Pokemon_Type_Icon_ghost${iconExtension}`,
    grass: `${iconPath}Pokemon_Type_Icon_grass${iconExtension}`,
    ground: `${iconPath}Pokemon_Type_Icon_ground${iconExtension}`,
    ice: `${iconPath}Pokemon_Type_Icon_ice${iconExtension}`,
    normal: `${iconPath}Pokemon_Type_Icon_normal${iconExtension}`,
    poison: `${iconPath}Pokemon_Type_Icon_poison${iconExtension}`,
    psychic: `${iconPath}Pokemon_Type_Icon_psychic${iconExtension}`,
    rock: `${iconPath}Pokemon_Type_Icon_rock${iconExtension}`,
    steel: `${iconPath}Pokemon_Type_Icon_steel${iconExtension}`,
    water: `${iconPath}Pokemon_Type_Icon_water${iconExtension}`,
  };

  return (
    <div className="container flex flex-col gap-4">
      <div className="pokemon-list flex flex-wrap justify-center gap-2 md:gap-3 items-start min-h-[648px]">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          pokemonData.map((pokemon) => {
            return (
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                sprites={pokemon.sprites}
                iconType={iconType}
                iconExtension={iconExtension}
                iconPath={iconPath}
                key={pokemon.id}
              />
            );
          })
        )}
      </div>
      <div className="pagination-wrapper flex gap-4 justify-center">
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
