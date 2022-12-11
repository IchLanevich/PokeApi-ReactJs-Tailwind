import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { capitalize } from "../utils/utils";
import PokemonAbout from "../components/pokemon_detail_components/pokemon_about_stats/PokemonAbout";
import PokemonImage from "../components/pokemon_detail_components/pokemon_about_stats/PokemonImage";
import PokemonStats from "../components/pokemon_detail_components/pokemon_about_stats/PokemonStats";
import PokemonBiography from "../components/pokemon_detail_components/PokemonBiography";
import PokemonEvolutions from "../components/pokemon_detail_components/PokemonEvolutions";
import PokemonAboutStats from "../components/pokemon_detail_components/PokemonAboutStats";
import Footer from "../components/Footer";

const PokemonDetail = ({ iconType, elementBgColor }) => {
  const { id } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const [is3DView, setIs3DView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokeDetail = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;

    const fetchPokeSpecies = await axios.get(data.species.url);
    const evoChain = await axios.get(fetchPokeSpecies.data.evolution_chain.url);
    const evolutionData = evoChain.data;
    const firstSpeciesUrl = evolutionData.chain.species.url;
    const secondSpeciesUrl = evolutionData.chain.evolves_to[0].species.url;
    const thirdSpeciesUrl =
      evolutionData?.chain?.evolves_to[0]?.evolves_to[0]?.species.url;

    const speciesUrl = [];

    if (firstSpeciesUrl !== " ") {
      speciesUrl.push(firstSpeciesUrl);
    }
    if (secondSpeciesUrl !== "") {
      speciesUrl.push(secondSpeciesUrl);
    }
    if (thirdSpeciesUrl !== "") {
      speciesUrl.push(thirdSpeciesUrl);
    }

    const fetchedSpeciesUrl = speciesUrl.map(async (url) => {
      return await axios.get(url);
    });

    const speciesData = [];

    const fetchedData = await Promise.allSettled(fetchedSpeciesUrl);
    fetchedData.forEach((item) => {
      if (item.status === "fulfilled") {
        speciesData.push(item.value.data);
      }
    });

    let newTotalStats = [];
    data.stats.map((item) => {
      newTotalStats.push(item.base_stat);
    });
    const totalStat = newTotalStats.reduce((total, num) => {
      return total + num;
    }, 0);

    let tempTextArr = [];
    speciesData[0].flavor_text_entries.map((text) => {
      if (text.language.name === "en") {
        tempTextArr.push(text);
      }
    });
    // speciesData.names.map((names) => {
    //   console.log(names.names);
    // });
    let namesInDifferentLanguange = [];
    speciesData.forEach((data) => {
      namesInDifferentLanguange.push(data.names);
    });
    let allSpeciesData = [];
    speciesData.forEach((data) => {
      allSpeciesData.push(data);
    });

    const pokemonObject = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      baseExp: data.base_experience,
      abilities: data.abilities.map((ability) => {
        return ability.ability.name;
      }),
      type: data.types.map((type) => {
        return type.type.name;
      }),
      moves: data.moves,
      forms: data.forms.map((type) => {
        return type.name;
      }),
      sprites: data.sprites.other["official-artwork"].front_default,
      stats: data.stats,
      totalStats: totalStat,
      names: speciesData,
      species: allSpeciesData,
      flavorTextArr: tempTextArr,
      evolutions: speciesData.map((species) => {
        return {
          id: species.id,
          name: species.name,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${species.id}.png`,
        };
      }),
    };

    setPokeData(pokemonObject);
    setIsLoading(false);
  };

  const handle3DView = () => {
    setIs3DView((state) => !state);
  };

  useEffect(() => {
    // fetchPokeDetail only called when page is refreshed
    // or
    // it only called 1x time when the PokemonDetail component rendered
    fetchPokeDetail();
  }, []);

  return (
    <>
      <Navbar backIcon={<AiOutlineArrowLeft />} />
      <div className="container pokemon-title w-full text-center">
        <h1 className="text-3xl font-bold tracking-wider">
          {isLoading ? "" : capitalize(pokeData.name)}
        </h1>
        {/* <h1>{pokeData.name || <Skeleton width={100} height={200} />}</h1> */}
      </div>
      <main className="flex flex-col gap-8">
        <section
          className={`pokemon-wrapper container mx-auto mt-4 flex flex-col md:flex-row justify-center gap-8 md:p-4 md:flex-col lg:flex-row`}
        >
          <PokemonAboutStats
            pokeData={pokeData}
            isLoading={isLoading}
            is3DView={is3DView}
            handle3DView={handle3DView}
          />
        </section>
        {isLoading ? "" : <PokemonBiography pokeData={pokeData} />}
        {isLoading ? "" : <PokemonEvolutions pokeData={pokeData} />}
      </main>
    </>
  );
};

export default PokemonDetail;
