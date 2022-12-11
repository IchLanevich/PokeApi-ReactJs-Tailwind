import { capitalize } from "../../../utils/utils";

const PokemonDescription = ({ pokeData }) => {
  const isExist = (id) => {
    if (pokeData.species[id]) {
      if (pokeData.species[id].id === pokeData.id) {
        return true;
      } else {
        return false;
      }
    }
    return;
  };

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
              {isExist(0) ? pokeData.baseExp : ""}
              {isExist(1) ? pokeData.baseExp : ""}
              {isExist(2) ? pokeData.baseExp : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Base Happiness</td>
            <td className="pl-6 py-1">
              {isExist(0) ? pokeData.species[0].base_happiness : ""}
              {isExist(1) ? pokeData.species[1].base_happiness : ""}
              {isExist(2) ? pokeData.species[2].base_happiness : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Growth Rate</td>
            <td className="pl-6 py-1">
              {isExist(0)
                ? capitalize(pokeData.species[0].growth_rate.name)
                : ""}
              {isExist(1)
                ? capitalize(pokeData.species[1].growth_rate.name)
                : ""}
              {isExist(2)
                ? capitalize(pokeData.species[2].growth_rate.name)
                : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Capture Rate</td>
            <td className="pl-6 py-1">
              {isExist(0) ? pokeData.species[0].capture_rate : ""}
              {isExist(1) ? pokeData.species[1].capture_rate : ""}
              {isExist(2) ? pokeData.species[2].capture_rate : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Species</td>
            <td className="pl-6 py-1">
              {isExist(0)
                ? capitalize(pokeData.species[0].egg_groups[0].name)
                : ""}
              {isExist(1)
                ? capitalize(pokeData.species[1].egg_groups[0].name)
                : ""}
              {isExist(2)
                ? capitalize(pokeData.species[2].egg_groups[0].name)
                : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Habitat</td>
            <td className="pl-6 py-1">
              {isExist(0) ? capitalize(pokeData.species[0].habitat.name) : ""}
              {isExist(1) ? capitalize(pokeData.species[1].habitat.name) : ""}
              {isExist(2) ? capitalize(pokeData.species[2].habitat.name) : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Color</td>
            <td className="pl-6 py-1">
              {isExist(0) ? capitalize(pokeData.species[0].color.name) : ""}
              {isExist(1) ? capitalize(pokeData.species[1].color.name) : ""}
              {isExist(2) ? capitalize(pokeData.species[2].color.name) : ""}
            </td>
          </tr>
          <tr>
            <td className="pl-2 py-1">Shape</td>
            <td className="pl-6 py-1">
              {isExist(0) ? capitalize(pokeData.species[0].shape.name) : ""}
              {isExist(1) ? capitalize(pokeData.species[1].shape.name) : ""}
              {isExist(2) ? capitalize(pokeData.species[2].shape.name) : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDescription;
