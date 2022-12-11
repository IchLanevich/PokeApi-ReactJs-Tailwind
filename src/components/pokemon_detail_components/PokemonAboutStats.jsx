import PokemonImage from "./pokemon_about_stats/PokemonImage";
import PokemonAbout from "./pokemon_about_stats/PokemonAbout";
import PokemonStats from "./pokemon_about_stats/PokemonStats";

const PokemonAboutStats = ({ pokeData, isLoading, is3DView, handle3DView }) => {
  return (
    <div className="flex flex-col p-3 gap-12 w-full justify-center md:flex-col items-center lg:flex-row">
      {isLoading ? (
        "Loading..."
      ) : (
        <PokemonImage
          pokeData={pokeData}
          is3DView={is3DView}
          handle3DView={handle3DView}
        />
      )}
      <div className="about_and_stats flex flex-col lg:flex-row gap-6 justify-evenly md:w-8/12">
        {isLoading ? "" : <PokemonAbout pokeData={pokeData} />}
        {isLoading ? "" : <PokemonStats pokeData={pokeData} />}
      </div>
    </div>
  );
};

export default PokemonAboutStats;
