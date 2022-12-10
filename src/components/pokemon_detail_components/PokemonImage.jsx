import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PokemonImage = (props) => {
  const { pokeData, is3DView, handle3DView } = props;
  return (
    <div className="pokemon-image mx-auto flex flex-col my-auto items-center lg:mx-0">
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
  );
};

export default PokemonImage;
