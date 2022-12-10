import { capitalize } from "../../utils/utils";
import { AiOutlineArrowRight } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const PokemonEvolutions = ({ pokeData }) => {
  return (
    <section id="pokemon-evolutions-section" className="container">
      <h2 className="text-2xl font-medium text-white text-center">
        Evolutions
      </h2>
      <div className="poke-evolution-wrapper justify-center text-white flex flex-row md:flex-row md:gap-0 md:justify-evenly md:mt-6">
        {pokeData && pokeData.evolutions ? (
          <div className="flex justify-center items-center">
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
          <div>
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
          <div>
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
    </section>
  );
};

export default PokemonEvolutions;
