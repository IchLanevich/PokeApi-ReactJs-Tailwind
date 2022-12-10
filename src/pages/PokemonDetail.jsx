import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { capitalize } from "../utils/utils";

const PokemonDetail = ({ iconType, elementBgColor }) => {
  const { id } = useParams();
  const [pokeData, setPokeData] = useState([]);
  const [is3DView, set3DView] = useState(false);

  const fetchPokeDetail = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;

    const fetchPokeSpecies = await axios.get(data.species.url);
    const evoChain = await axios.get(fetchPokeSpecies.data.evolution_chain.url);
    const evolutionData = evoChain.data;

    const speciesUrl = [];

    if (evolutionData.chain.species.url !== " ") {
      speciesUrl.push(evolutionData.chain.species.url);
    }
    if (evolutionData.chain.evolves_to[0].species.url !== "") {
      speciesUrl.push(evolutionData.chain.evolves_to[0].species.url);
    }
    if (
      evolutionData?.chain?.evolves_to[0]?.evolves_to[0]?.species.url !== ""
    ) {
      speciesUrl.push(
        evolutionData?.chain?.evolves_to[0]?.evolves_to[0]?.species.url
      );
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
    // console.log(data);
    // console.log(speciesData[0]);

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
  };

  const handle3DView = () => {
    set3DView((state) => !state);
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
      <div className="pokemon-title">
        <h1 className="text-white text-3xl font-bold tracking-wider">
          {pokeData.name && capitalize(pokeData.name)}
        </h1>
      </div>
      <section className="pokemon-wrapper container mx-auto mt-4 p-4 text-white flex flex-col md:flex-row justify-center gap-8 md:p-4 md:flex-col lg:flex-row">
        <div className="pokemon-image-and-name mx-auto flex flex-col my-auto lg:mx-0">
          {pokeData.sprites && (
            <div className="img-wrapper border-2 border-dashed border-white/50 relative m-0 bg-darkLight rounded-md p-4 flex md:h-96 md:w-96">
              <LazyLoadImage
                className="mx-auto my-auto object-contain w-full h-full"
                src={
                  is3DView
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeData.id}.png`
                    : pokeData.sprites
                }
                alt={pokeData.name}
                effect="blur"
              />
              <div className="view-btn-wrapper">
                <input
                  type="checkbox"
                  name="3dview"
                  value={is3DView}
                  id="3dview"
                  className="hidden check-with-label"
                  onChange={handle3DView}
                />
                <label
                  htmlFor="3dview"
                  className="label-for-check select-none cursor-pointer h-10 w-10 bg-gray-700 absolute top-2 right-2 flex justify-center items-center rounded-md border-2 border-white/50 border-dashed"
                >
                  3D
                </label>
              </div>
            </div>
          )}
        </div>

        <article className="pokemon-about">
          <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl font-medium">
            About
          </h2>
          <table className="mt-4">
            <tbody>
              <tr>
                <td className="pl-4 py-2">Name</td>
                <td className="pl-4 py-2">
                  {pokeData.name && capitalize(pokeData.name)}
                </td>
              </tr>
              <tr>
                <td className="pl-4 py-2">Height</td>
                <td className="pl-4 py-2">{pokeData.height * 10}cm</td>
              </tr>
              <tr>
                <td className="pl-4 py-2">Weight</td>
                <td className="pl-4 py-2">{pokeData.weight / 10}kg</td>
              </tr>
              <tr>
                <td className="pl-4 py-2">Abilities</td>
                <td className="flex gap-3 pl-3 md:pl-4 py-2 flex flex-wrap">
                  {pokeData.abilities &&
                    pokeData.abilities.map((name) => {
                      return (
                        <span
                          key={name}
                          className="px-2 py-1 bg-gray-600 rounded"
                        >
                          {capitalize(name)}
                        </span>
                      );
                    })}
                </td>
              </tr>
              <tr>
                <td className="pl-4 py-2 px-4 py-2">Type</td>
                <td className="flex gap-3 pl-3 md:pl-4 py-2 flex-wrap">
                  {pokeData.type &&
                    pokeData.type.map((name) => {
                      return (
                        <span
                          key={name}
                          className={`${elementBgColor[name]} px-2 py-1 rounded flex gap-3`}
                        >
                          {capitalize(name)}
                          <span className="flex justify-center items-center h-5">
                            <img className="h-full" src={iconType[name]} />
                          </span>
                        </span>
                      );
                    })}
                </td>
              </tr>
              <tr>
                <td className="pl-4 py-2 px-4 py-2">Forms</td>
                <td className="flex gap-3 pl-3 md:pl-4 py-2">
                  {pokeData.forms &&
                    pokeData.forms.map((name) => {
                      let typeName = pokeData.type[0];
                      return (
                        <span
                          key={name}
                          className={`${elementBgColor[typeName]} px-2 py-1 rounded flex gap-3`}
                        >
                          {capitalize(name)}
                        </span>
                      );
                    })}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="pokemon-stats">
          <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl font-medium">
            Stats
          </h2>
          <table className="mt-4">
            <tbody className="w-80">
              {pokeData.stats &&
                pokeData.stats.map((item) => {
                  return (
                    <tr key={item.stat.name}>
                      <td className="pl-4 py-2">
                        {item.stat.name.slice(0, 7) === "special"
                          ? `Sp. ${
                              item.stat.name.slice(8).charAt(0).toUpperCase() +
                              item.stat.name.slice(9)
                            }`
                          : item.stat.name
                          ? capitalize(item.stat.name)
                          : capitalize(item.stat.name)}
                      </td>
                      <td className="w-52 px-4 py-2">
                        <ProgressBar completed={item.base_stat} />
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td className="px-4 py-2">Total</td>
                <td className="w-52 px-4 py-2">{pokeData.totalStats}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>
      <section id="pokemon-description" className="container px-4">
        <h2 className="text-2xl font-medium">Pokemon Description</h2>
        <div className="container-wrapper flex bg-gray-700 w-full rounded-lg">
          <div className="img-wrapper m-0 bg-darkLight rounded-md p-4 flex md:h-96 md:w-96">
            <LazyLoadImage
              className="mx-auto my-auto object-contain w-full h-full"
              src={pokeData.sprites}
              alt={pokeData.name}
              effect="blur"
            />
          </div>
          <div className="description-wrapper">
            <div className="flavor-text-wrapper px-2 py-1">
              {pokeData.species ? (
                <p>{pokeData.flavorTextArr[0].flavor_text}</p>
              ) : (
                ""
              )}
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="pl-2 py-1">Base Experience</td>
                  <td className="pl-2 py-1">
                    {pokeData.baseExp && pokeData.baseExp}
                  </td>
                </tr>
                <tr>
                  <td className="pl-2 py-1">Base Happiness</td>
                  <td className="pl-2 py-1">
                    {pokeData.species && pokeData.species.base_happiness}
                  </td>
                </tr>
                <tr>
                  <td className="pl-2 py-1">Growth Rate</td>
                  <td className="pl-2 py-1">
                    {pokeData.species &&
                      capitalize(pokeData.species.growth_rate.name)}
                  </td>
                </tr>
                <tr>
                  <td className="pl-2 py-1">Capture Rate</td>
                  <td className="pl-2 py-1">
                    {pokeData.species ? pokeData.species.capture_rate : ""}
                  </td>
                </tr>
                <tr>
                  <td className="pl-2 py-1">Species</td>
                  <td className="pl-2 py-1">
                    {pokeData.species &&
                      capitalize(pokeData.species.egg_groups[0].name)}
                  </td>
                </tr>
                <tr>
                  <td className="pl-2 py-1">Color</td>
                  <td className="pl-2 py-1">
                    {pokeData.species &&
                      capitalize(pokeData.species.color.name)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="pokemon-evolutions-section" className="container">
        <h2 className="text-2xl font-medium text-white text-center">
          Evolutions
        </h2>
        <div className="poke-evolution-wrapper justify-evenly text-white flex flex-col md:flex-row gap-20">
          {pokeData && pokeData.evolutions ? (
            <div key={pokeData.evolutions[0].id}>
              <Link
                to={`/pokemon-detail/${pokeData.evolutions[0].id}`}
                reloadDocument
              >
                <LazyLoadImage
                  className="object-contain h-52"
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
          <div className="right-arrow text-4xl flex items-center justify-center">
            <AiOutlineArrowRight />
          </div>
          {pokeData && pokeData.evolutions ? (
            <div key={pokeData.evolutions[1].id}>
              <Link
                to={`/pokemon-detail/${pokeData.evolutions[1].id}`}
                reloadDocument
              >
                <LazyLoadImage
                  className="object-contain h-52"
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
          <div className="right-arrow text-4xl flex items-center justify-center">
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
                  className="object-contain h-52"
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
      </section>
    </>
  );
};

export default PokemonDetail;
