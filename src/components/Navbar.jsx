import { Link, useNavigate } from "react-router-dom";

const leftArrow = {
  position: "absolute",
  left: "35px",
  color: "white",
  fontSize: "1.5rem",
};

const Navbar = ({ backIcon }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-darkLight w-full justify-center flex py-3 px-8 mb-6 flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="text-white mr-auto"
        style={leftArrow}
      >
        {backIcon}
      </Link>
      <Link to="/" className="">
        <img
          className="h-12"
          src="/assets/International_Pokémon_logo.png"
          alt="Pokemon Logo"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
