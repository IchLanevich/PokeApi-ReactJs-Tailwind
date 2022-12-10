import { capitalize } from "../../../utils/utils";

const PokemonDescription = ({ pokeData }) => {
  return (
    <div className="description-wrapper mb-6 md:mb-0">
      <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl font-medium">
        Description
      </h2>
      <table className="mt-4">
        <tbody>
          <tr>
            <td className="pl-2 py-1">Base Experience</td>
            <td className="pl-6 py-1">
              {pokeData.baseExp && pokeData.baseExp}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Base Happiness</td>
            <td className="pl-6 py-1">
              {pokeData.species && pokeData.species.base_happiness}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Growth Rate</td>
            <td className="pl-6 py-1">
              {pokeData.species &&
                capitalize(pokeData.species.growth_rate.name)}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Capture Rate</td>
            <td className="pl-6 py-1">
              {pokeData.species ? pokeData.species.capture_rate : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Species</td>
            <td className="pl-6 py-1">
              {pokeData.species &&
                capitalize(pokeData.species.egg_groups[0].name)}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Habitat</td>
            <td className="pl-6 py-1">
              {pokeData.species && capitalize(pokeData.species.habitat.name)}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Color</td>
            <td className="pl-6 py-1">
              {pokeData.species && capitalize(pokeData.species.color.name)}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Shape</td>
            <td className="pl-6 py-1">
              {pokeData.species && capitalize(pokeData.species.shape.name)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDescription;
