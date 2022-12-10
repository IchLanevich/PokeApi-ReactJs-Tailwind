const PokemonQoutes = ({ pokeData }) => {
  return (
    <div className="flavor-text-wrapper px-2 py-1 w-full md:w-1/4 flex justify-center items-center">
      {pokeData.species ? (
        <p className="text-2xl">" {pokeData.flavorTextArr[0].flavor_text} "</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default PokemonQoutes;
