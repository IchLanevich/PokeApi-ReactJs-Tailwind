import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import { iconType, elementBgColor } from "./utils/utils";

function App() {
  return (
    <Router>
      <div id="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon-detail/:id"
            element={
              <PokemonDetail
                iconType={iconType}
                elementBgColor={elementBgColor}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
