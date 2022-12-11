import { capitalize } from "../../../utils/utils";
import ProgressBar from "../../ProgressBar";

const PokemonStats = (props) => {
  const { pokeData } = props;
  return (
    <article className="pokemon-stats w-full lg:w-6/12 flex flex-col">
      <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl md:text-center lg:text-left font-medium">
        Stats
      </h2>
      <table className="mt-4">
        <tbody>
          {pokeData.stats &&
            pokeData.stats.map((item) => {
              return (
                <tr key={item.stat.name}>
                  <td className="pl-4 py-2 w-0">
                    {item.stat.name.slice(0, 7) === "special"
                      ? `Sp. ${
                          item.stat.name.slice(8).charAt(0).toUpperCase() +
                          item.stat.name.slice(9)
                        }`
                      : item.stat.name
                      ? capitalize(item.stat.name)
                      : capitalize(item.stat.name)}
                  </td>
                  <td className="md:w-52 px-4 py-2">
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
  );
};

export default PokemonStats;
