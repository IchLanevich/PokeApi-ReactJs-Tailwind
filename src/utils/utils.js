export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const backgroundImageBasedOnHabitat = {
  cave: "/assets/pokedex_habitat_background/Cave.png",
  forest: "/assets/pokedex_habitat_background/Forest.png",
  grassland: "/assets/pokedex_habitat_background/Grassland.png",
  mountain: "/assets/pokedex_habitat_background/Mountain.png",
  rare: "/assets/pokedex_habitat_background/Rare.png",
  "rough-terrain": "/assets/pokedex_habitat_background/Roughterrain.png",
  sea: "/assets/pokedex_habitat_background/Sea.png",
  urban: "/assets/pokedex_habitat_background/Urban.png",
  "waters-edge": "/assets/pokedex_habitat_background/Watersedge.png",
};

export const iconPath = "/assets/pokemon_types_icon/IconSvg/";
export const iconExtension = ".svg";
export const iconType = {
  bug: `${iconPath}Pokemon_Type_Icon_bug${iconExtension}`,
  dark: `${iconPath}Pokemon_Type_Icon_dark${iconExtension}`,
  dragon: `${iconPath}Pokemon_Type_Icon_dragon${iconExtension}`,
  electric: `${iconPath}Pokemon_Type_Icon_electric${iconExtension}`,
  fairy: `${iconPath}Pokemon_Type_Icon_fairy${iconExtension}`,
  fighting: `${iconPath}Pokemon_Type_Icon_fighting${iconExtension}`,
  fire: `${iconPath}Pokemon_Type_Icon_fire${iconExtension}`,
  flying: `${iconPath}Pokemon_Type_Icon_flying${iconExtension}`,
  ghost: `${iconPath}Pokemon_Type_Icon_ghost${iconExtension}`,
  grass: `${iconPath}Pokemon_Type_Icon_grass${iconExtension}`,
  ground: `${iconPath}Pokemon_Type_Icon_ground${iconExtension}`,
  ice: `${iconPath}Pokemon_Type_Icon_ice${iconExtension}`,
  normal: `${iconPath}Pokemon_Type_Icon_normal${iconExtension}`,
  poison: `${iconPath}Pokemon_Type_Icon_poison${iconExtension}`,
  psychic: `${iconPath}Pokemon_Type_Icon_psychic${iconExtension}`,
  rock: `${iconPath}Pokemon_Type_Icon_rock${iconExtension}`,
  steel: `${iconPath}Pokemon_Type_Icon_steel${iconExtension}`,
  water: `${iconPath}Pokemon_Type_Icon_water${iconExtension}`,
};

export const elementBgColor = {
  bug: `bg-[#9DC130]`,
  dark: `bg-[#5F606D]`,
  dragon: `bg-[#0773C7]`,
  electric: `bg-[#EDD53F]`,
  fairy: `bg-[#EF97E6]`,
  fighting: `bg-[#D94256]`,
  fire: `bg-[#F8A54F]`,
  flying: `bg-[#9BB4E8]`,
  ghost: `bg-[#6970C5]`,
  grass: `bg-[#5DBE62]`,
  ground: `bg-[#D78555]`,
  ice: `bg-[#7ED4C9]`,
  normal: `bg-[#9A9DA1]`,
  poison: `bg-[#B563CE]`,
  psychic: `bg-[#F87C7A]`,
  rock: `bg-[#CEC18C]`,
  steel: `bg-[#5596A4]`,
  water: `bg-[#559EDF]`,
};
