import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChicchiList from "./pages/ChicchiList";
import ChicchiDetail from "./pages/ChicchiDetail";
import "./App.css";

function App() {
  // STATO PER I FAVORITI
  const [favoriti, setFavoriti] = useState([]);

  // FUNZIONE PER GESTIRE I FAVORITI
  const toggleFavorito = (chicco) => {
    console.log("toggle favorito per:", chicco.title);
    let nuoviFavoriti = [...favoriti];
    let index = nuoviFavoriti.findIndex((f) => f.id === chicco.id);

    if (index >= 0) {
      nuoviFavoriti.splice(index, 1);
      console.log("rimosso dai favoriti");
    } else {
      nuoviFavoriti.push(chicco);
      console.log("aggiunto ai favoriti");
    }

    setFavoriti(nuoviFavoriti);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            ☕ Comparatore Chicchi
          </Link>
          <div className="nav-info">Favoriti: {favoriti.length}</div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ChicchiList
                favoriti={favoriti}
                toggleFavorito={toggleFavorito}
              />
            }
          />
          <Route
            path="/chicco/:id"
            element={
              <ChicchiDetail
                favoriti={favoriti}
                toggleFavorito={toggleFavorito}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
