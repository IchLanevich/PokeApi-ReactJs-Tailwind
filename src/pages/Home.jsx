import PokemonList from "../components/home_components/PokemonList";
import SearchPokemon from "../components/home_components/SearchPokemon";
import { POKEMON_API_URL } from "../data/api";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createContext } from "react";

export const HomeContext = createContext();

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
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

  return (
    <>
      <Navbar />
      {/* use {{}} moustache braces for context value */}
      <HomeContext.Provider
        value={{
          pokemonData,
          setPokemonData,
          currentUrl,
          setCurrentUrl,
          previousUrl,
          setPreviousUrl,
          nextUrl,
          setNextUrl,
          isLoading,
          setIsLoading,
        }}
      >
        <div className="Home flex flex-col space-y-6">
          <SearchPokemon />
          <PokemonList />
        </div>
      </HomeContext.Provider>
    </>
  );
};

export default Home;
