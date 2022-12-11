import PokemonDescription from "./pokemon_biography_components/PokemonDescription";

import PokemonQoutes from "./pokemon_biography_components/PokemonQoutes";

const PokemonBiography = (props) => {
  const { pokeData } = props;
  return (
    <section id="pokemon-description" className="container p-3 md:p-0">
      <div
        className={`pokemon-desc-wrapper px-6 py-6 rounded-lg ${
          pokeData.species[0] && pokeData.species[0].habitat.name
            ? pokeData.species[0].habitat.name
            : ""
        }`}
      >
        <div className="wrapper md:flex w-full gap-6 justify-evenly ">
          <PokemonDescription pokeData={pokeData} />
          <PokemonQoutes pokeData={pokeData} />
        </div>
      </div>
    </section>
  );
};

export default PokemonBiography;
