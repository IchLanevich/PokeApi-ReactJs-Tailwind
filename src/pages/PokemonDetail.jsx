import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { capitalize } from "../utils/utils";
import PokemonAbout from "../components/pokemon_detail_components/PokemonAbout";
import PokemonImage from "../components/pokemon_detail_components/PokemonImage";
import PokemonStats from "../components/pokemon_detail_components/PokemonStats";
import PokemonBiography from "../components/pokemon_detail_components/PokemonBiography";
import PokemonEvolutions from "../components/pokemon_detail_components/PokemonEvolutions";

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
      names: speciesData[0].names,
      species: speciesData[0],
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
          className={`pokemon-wrapper container mx-auto mt-4 p-4 flex flex-col md:flex-row justify-center gap-8 md:p-4 md:flex-col lg:flex-row`}
        >
          <div className="flex flex-col p-3 gap-12 w-full justify-center md:flex-row">
            {isLoading ? (
              "Loading..."
            ) : (
              <PokemonImage
                pokeData={pokeData}
                is3DView={is3DView}
                handle3DView={handle3DView}
              />
            )}
            {isLoading ? "" : <PokemonAbout pokeData={pokeData} />}
            {isLoading ? "" : <PokemonStats pokeData={pokeData} />}
          </div>
        </section>
        {isLoading ? "" : <PokemonBiography pokeData={pokeData} />}
        {isLoading ? "" : <PokemonEvolutions pokeData={pokeData} />}
        {/* <section id="pokemon-evolutions-section" className="container">
          <h2 className="text-2xl font-medium text-white text-center">
            Evolutions
          </h2>
          <div className="poke-evolution-wrapper justify-center text-white flex flex-row md:flex-row md:gap-0 md:justify-evenly md:mt-6">
            {pokeData && pokeData.evolutions ? (
              <div
                key={pokeData.evolutions[0].id}
                className="flex justify-center items-center"
              >
                <Link
                  to={`/pokemon-detail/${pokeData.evolutions[0].id}`}
                  reloadDocument
                >
                  <LazyLoadImage
                    className="object-contain w-16 md:w-52 md:h-52"
                    src={pokeData.evolutions[0].imgUrl}
                    alt={pokeData.evolutions[0].name}
                    effect="blur"
                  />
                  <div className="name-wrapper">
                    <h3 className="text-center">
                      {capitalize(pokeData.evolutions[0].name)}
                    </h3>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="right-arrow text-2xl md:text-4xl flex items-center justify-center">
              <AiOutlineArrowRight />
            </div>
            {pokeData && pokeData.evolutions ? (
              <div key={pokeData.evolutions[1].id}>
                <Link
                  to={`/pokemon-detail/${pokeData.evolutions[1].id}`}
                  reloadDocument
                >
                  <LazyLoadImage
                    className="object-contain w-16 md:w-52 md:h-52"
                    src={pokeData.evolutions[1].imgUrl}
                    alt={pokeData.evolutions[1].name}
                    effect="blur"
                  />
                  <div className="name-wrapper">
                    <h3 className="text-center">
                      {capitalize(pokeData.evolutions[1].name)}
                    </h3>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="right-arrow text-2xl md:text-4xl flex items-center justify-center">
              <AiOutlineArrowRight />
            </div>
            {pokeData && pokeData.evolutions ? (
              <div
                key={
                  pokeData?.evolutions[2]?.id
                    ? pokeData?.evolutions[2]?.id
                    : pokeData?.evolutions[0]?.id
                }
              >
                <Link
                  to={`/pokemon-detail/${
                    pokeData?.evolutions[2]?.id
                      ? pokeData?.evolutions[2]?.id
                      : pokeData?.evolutions[0]?.id
                  }`}
                  reloadDocument
                >
                  <LazyLoadImage
                    className="object-contain w-16 md:w-52 md:h-52"
                    src={
                      pokeData?.evolutions[2]?.imgUrl
                        ? pokeData?.evolutions[2]?.imgUrl
                        : "https://ik.imagekit.io/ichlanevich/not_available_evo_img.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670585605233"
                    }
                    alt={
                      pokeData?.evolutions[2]?.name
                        ? pokeData?.evolutions[2]?.name
                        : ""
                    }
                    effect="blur"
                  />
                  <div className="name-wrapper">
                    <h3 className="text-center">
                      {pokeData?.evolutions[2]?.name
                        ? capitalize(pokeData?.evolutions[2]?.name)
                        : ""}
                    </h3>
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </section> */}
      </main>
    </>
  );
};

export default PokemonDetail;
