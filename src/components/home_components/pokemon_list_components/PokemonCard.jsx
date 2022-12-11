import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/utils";

const PokemonCard = ({ id, name, types, sprites, iconType }) => {
  return (
    <Link to={`/pokemon-detail/${id}`}>
      <div
        className="card text-white  h-36 p-3 rounded-md hover:shadow-[0px_0px_15px_rgba(255,255,255,0.2)] transition duration-[50ms] ease-in-out border-2 border-dashed border-white/25 md:w-40 md:h-52"
        key={id}
      >
        <div className="pokemon-name-wrapper flex items-center">
          <p className="font-semibold flex grow break-all text-left text-xs md:text-base truncate">
            {capitalize(name)}
          </p>
          <p className="pokemon-id text-xs md:text-base font-semibold text-white/50">
            #{id}
          </p>
        </div>
        <div className="pomon-type-wrapper flex gap-2 mt-1">
          {types.map((type, index) => {
            return (
              <img
                className="h-5 md:h-7"
                src={iconType[type.type.name]}
                alt={type.type.name}
                key={index}
              />
            );
          })}
        </div>
        <div className="pokemon-img-wrapper flex justify-center">
          <img
            className="mt-2 w-16 md:h-32 md:w-32 md:mt-0 "
            src={sprites.front_default}
            alt={name}
          />
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
