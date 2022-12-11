import { capitalize, elementBgColor, iconType } from "../../../utils/utils";

const PokemonAbout = (props) => {
  const { pokeData } = props;
  return (
    <article className="pokemon-about w-full flex flex-col lg:w-6/12">
      <h2 className="border-b-2 border-dashed border-b-white/75 px-4 py-2 text-xl w-full md:text-center lg:text-left font-medium">
        About
      </h2>
      <table className="mt-4">
        <tbody className="w-full">
          <tr>
            <td className="pl-4 py-2">Name</td>
            <td className="pl-4 py-2">
              {pokeData.name && capitalize(pokeData.name)}
            </td>
          </tr>
          <tr>
            <td className="pl-4 py-2">Height</td>
            <td className="pl-4 py-2">{pokeData.height * 10}cm</td>
          </tr>
          <tr>
            <td className="pl-4 py-2">Weight</td>
            <td className="pl-4 py-2">{pokeData.weight / 10}kg</td>
          </tr>
          <tr>
            <td className="pl-4 py-2">Abilities</td>
            <td className="flex gap-3 pl-3 md:pl-4 py-2 flex flex-wrap">
              {pokeData.abilities &&
                pokeData.abilities.map((name) => {
                  return (
                    <span key={name} className="px-2 py-1 bg-gray-600 rounded">
                      {capitalize(name)}
                    </span>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td className="pl-4 py-2py-2 ">Type</td>
            <td className="flex gap-3 pl-3 md:pl-4 py-2 flex-wrap">
              {pokeData.type &&
                pokeData.type.map((name) => {
                  return (
                    <span
                      key={name}
                      className={`${elementBgColor[name]} px-2 py-1 rounded flex gap-3`}
                    >
                      {capitalize(name)}
                      <span className="flex justify-center items-center h-5">
                        <img className="h-full" src={iconType[name]} />
                      </span>
                    </span>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td className="pl-4 py-2 py-2">Forms</td>
            <td className="flex gap-3 pl-3 md:pl-4 py-2">
              {pokeData.forms &&
                pokeData.forms.map((name) => {
                  let typeName = pokeData.type[0];
                  return (
                    <span
                      key={name}
                      className={`${elementBgColor[typeName]} px-2 py-1 rounded flex gap-3`}
                    >
                      {capitalize(name)}
                    </span>
                  );
                })}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default PokemonAbout;
