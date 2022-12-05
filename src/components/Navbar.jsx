import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-darkLight w-full justify-center flex p-3 mb-6">
      <img
        className="h-12"
        src="public\assets\International_Pokémon_logo.png"
        alt="Pokemon Logo"
      />
    </nav>
  );
};

export default Navbar;
