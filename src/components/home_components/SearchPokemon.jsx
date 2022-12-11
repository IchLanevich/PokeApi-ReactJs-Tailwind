import axios from "axios";
import { useMemo } from "react";
import { useState, useEffect } from "react";

const SearchPokemon = ({ setPokemonData }) => {
  const [query, setQuery] = useState("");
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10000"
  );
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemonData = async () => {
    if (query) {
      const res = await axios.get(pokemonUrl);
      const { results } = res.data;
      setAllPokemonData(results);
    } else {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      const { results } = res.data;
      setAllPokemonData(results);
    }
    setIsLoading(false);
    // console.log(results.filter((item) => item.name.includes("pika"))); only return an object with pokemon.name that have a word of pika
  };

  const filteredPokemon = allPokemonData.filter((pokemon) =>
    pokemon.name.includes(`${query}`)
  );
  const pokemonUrls = [];
  // if (query) {
  //   const pokemonObjUrls = filteredPokemon.forEach((pokemon) => {
  //     pokemonUrls.push(pokemon.url);
  //   });
  // } else {

  // }
  const pokemonObjUrls = filteredPokemon.forEach((pokemon) => {
    pokemonUrls.push(pokemon.url);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchPokemons = pokemonUrls.map(async (url) => {
      return await axios.get(url);
    });
    setPokemonData([]);

    const newSearchedPokemons = [];

    const fetchedPokeData = await Promise.allSettled(fetchPokemons);
    fetchedPokeData.forEach((pokemon) => {
      if (pokemon.status === "fulfilled") {
        newSearchedPokemons.push(pokemon.value.data);
      }
    });
    // setSearchPokeData(newSearchedPokemons);
    setPokemonData(newSearchedPokemons);
  };
  // console.log(searchedPokeData); // array of pokemon obj that will be shown on search results

  useEffect(() => {
    fetchPokemonData();
  }, [query]);
  //

  return (
    <section className="container px-2">
      <div className="search-comp h-full bg-darkLight p-5 rounded-sm">
        <form
          className="search-wrapper flex justify-center h-10 text-gray-800"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name=""
            id="searchInput"
            className="search-input rounded-tl-sm rounded-bl-sm px-3 py-4 w-44 md:w-96 text-base "
            placeholder="Search Pokémon"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Search"
            className="text-white px-5 bg-gray-500 border-0 rounded-tr-sm rounded-br-sm text-base hover:bg-gray-500/75 active:bg-gray-500/50"
          />
        </form>
      </div>
    </section>
  );
};

export default SearchPokemon;
