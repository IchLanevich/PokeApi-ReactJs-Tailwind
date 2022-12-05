// import { useEffect } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  IMAGE_API_URL,
  OFFICIAL_ARTWORK_URL,
  POKEMON_API_URL,
} from "../data/api";

const PokemonCard = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(POKEMON_API_URL);
    const { results } = res.data;

    const pokemonUrls = [];
    const pokemonObjUrls = results.forEach((item, index) => {
      pokemonUrls.push(item.url);
    });

    const pokemons = pokemonUrls.map(async (url) => {
      return await axios.get(url);
    });

    const newPokemonData = [];

    const settled = await Promise.allSettled(pokemons);
    settled.forEach((item, index) => {
      // const { name, id, height, weight, types, ...rest } = item.value.data;
      // const data = item.value.data;
      // const pokemonObject = {
      //   name: data.name,
      // };

      if (item.status === "fulfilled") {
        newPokemonData.push(item.value.data);
      }
    });

    setPokemonData(newPokemonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const iconPath = "public/assets/pokemon_types_icon/TypesSvg/Types/";
  const iconExtension = ".svg";
  const iconType = {
    bug: `${iconPath}bug${iconExtension}`,
    dark: `${iconPath}dark${iconExtension}`,
    dragon: `${iconPath}dragon${iconExtension}`,
    electric: `${iconPath}electric${iconExtension}`,
    fairy: `${iconPath}fairy${iconExtension}`,
    fight: `${iconPath}fight${iconExtension}`,
    fire: `${iconPath}fire${iconExtension}`,
    flying: `${iconPath}flying${iconExtension}`,
    ghost: `${iconPath}ghost${iconExtension}`,
    grass: `${iconPath}grass${iconExtension}`,
    ground: `${iconPath}ground${iconExtension}`,
    ice: `${iconPath}ice${iconExtension}`,
    normal: `${iconPath}normal${iconExtension}`,
    poison: `${iconPath}poison${iconExtension}`,
    psychic: `${iconPath}psychic${iconExtension}`,
    rock: `${iconPath}rock${iconExtension}`,
    steel: `${iconPath}steel${iconExtension}`,
    water: `${iconPath}water${iconExtension}`,
  };
  // To count key object inside iconType object
  // console.log(Object.keys(iconType));

  return (
    <div className="container flex flex-wrap gap-4">
      {pokemonData.map((pokemon) => {
        return (
          <div
            className="card bg-darkLight text-white w-40 p-2 rounded-md h-52"
            key={pokemon.id}
          >
            <div className="pokemon-name-wrapper flex">
              <p className="text-base font-semibold flex grow">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </p>
              <p className="pokemon-id">#{pokemon.id}</p>
            </div>
            <div className="pokemon-type-wrapper flex">
              {pokemon.types.map((type, index) => {
                return (
                  <img
                    className="h-8 w-8"
                    src={iconType[type.type.name]}
                    alt={type.type.name}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="pokemon-img-wrapper flex justify-center">
              <img
                className="bg-gray-600 h-32"
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonCard;
