import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChicchiList from "./pages/ChicchiList";
import ChicchiDetail from "./pages/ChicchiDetail";
import "./App.css";

function App() {
  // stato per i favoriti
  const [favoriti, setFavoriti] = useState([]);

  // stato per confronto (max 2 chicchi)
  const [confronto, setConfronto] = useState([]);

  // funzione per gestire i favoriti
  const toggleFavorito = (chicco) => {
    console.log("toggle favorito per:", chicco.title);
    let nuoviFavoriti = [...favoriti];
    let index = nuoviFavoriti.findIndex((f) => f.id == chicco.id);

    if (index >= 0) {
      nuoviFavoriti.splice(index, 1);
      console.log("rimosso dai favoriti");
    } else {
      nuoviFavoriti.push(chicco);
      console.log("aggiunto ai favoriti");
    }

    setFavoriti(nuoviFavoriti);
  };

  // funzione per aggiungere al confronto
  const aggiungiConfronto = (chicco) => {
    console.log("=== DEBUG CONFRONTO ===");
    console.log("Chicco ricevuto:", chicco);
    console.log("ID chicco:", chicco.id, "tipo:", typeof chicco.id);
    console.log("Confronto attuale:", confronto);
    console.log("Lunghezza confronto:", confronto.length);
    console.log("voglio confrontare:", chicco.title);

    // controllo se ho già 2 chicchi
    if (confronto.length >= 2) {
      console.log("ERRORE: già 2 chicchi nel confronto");
      alert("Puoi confrontare solo 2 chicchi alla volta!");
      return;
    }

    // controllo se questo chicco è già nel confronto
    let presente = confronto.find((c) => {
      console.log("Controllo ID:", c.id, "vs", chicco.id);
      return c.id == chicco.id; // usa == invece di ===
    });
    if (presente) {
      console.log("ERRORE: chicco già presente");
      alert("Questo chicco è già nel confronto!");
      return;
    }

    // aggiungo al confronto
    console.log("Aggiungo al confronto:", chicco.title);
    setConfronto([...confronto, chicco]);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            ☕ Comparatore Chicchi
          </Link>
          <div className="nav-info">
            Favoriti: {favoriti.length} | Confronto: {confronto.length}/2
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ChicchiList
                favoriti={favoriti}
                toggleFavorito={toggleFavorito}
                confronto={confronto}
                aggiungiConfronto={aggiungiConfronto}
              />
            }
          />
          <Route
            path="/chicco/:id"
            element={
              <ChicchiDetail
                favoriti={favoriti}
                toggleFavorito={toggleFavorito}
                confronto={confronto}
                aggiungiConfronto={aggiungiConfronto}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
