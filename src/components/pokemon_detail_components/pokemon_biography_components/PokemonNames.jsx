import { capitalize } from "../../../utils/utils";

const PokemonNames = ({ pokeData }) => {
  return (
    <div className="languange-names-wrapper mb-6 md:mb-0">
      <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl font-medium">
        Names
      </h2>
      <table className="mt-4">
        <tbody>
          {pokeData.names &&
            pokeData.names.map((nameObj, index) => {
              return (
                <tr key={index}>
                  <td className="pl-2 py-1">
                    {capitalize(nameObj.language.name)}
                  </td>
                  <td className="pl-6 py-1">{capitalize(nameObj.name)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonNames;
