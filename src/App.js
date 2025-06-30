import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChicchiList from "./pages/ChicchiList";
import ChicchiDetail from "./pages/ChicchiDetail";
import "./App.css";
import ModalConfronto from "./components/ModalConfronto";
import SidebarFavoriti from "./components/SidebarFavoriti";

function App() {
  // stato per i favoriti
  const [favoriti, setFavoriti] = useState([]);

  // stato per confronto (max 2 chicchi)
  const [confronto, setConfronto] = useState([]);

  // stato per il modal di confronto
  const [modalOpen, setModalOpen] = useState(false);

  // stato per la sidebar favoriti
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const aggiungiConfronto = async (chicco) => {
    console.log("voglio confrontare:", chicco.title);

    if (confronto.length >= 2) {
      // Se già ci sono 2 chicchi, apro la modal ma non chiudo la sidebar
      setModalOpen(true);
      return;
    }

    let presente = confronto.find((c) => c.id == chicco.id);
    if (presente) {
      alert("Questo chicco è già nel confronto!");
      return;
    }

    if (chicco.origin && chicco.flavor && chicco.price) {
      let nuovoConfronto = [...confronto, chicco];
      setConfronto(nuovoConfronto);

      if (nuovoConfronto.length === 2) {
        // Chiudo sidebar e apro modal solo quando aggiungo il secondo chicco
        setSidebarOpen(false);
        setModalOpen(true);
      }
      return;
    }

    try {
      const { chicchiApi } = await import("./services/chicchiApi");
      const response = await chicchiApi.getChicco(chicco.id);
      const chiccoCompleto = response.data.chicco || response.data;

      let nuovoConfronto = [...confronto, chiccoCompleto];
      setConfronto(nuovoConfronto);

      if (nuovoConfronto.length === 2) {
        // Chiudo sidebar e apro modal solo quando aggiungo il secondo chicco
        setSidebarOpen(false);
        setModalOpen(true);
      }
    } catch (error) {
      alert("Errore nel caricamento del chicco per il confronto");
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src="/images/sorsoscelto.png" alt="Logo Comparatore Chicchi" />
          </Link>
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
                setSidebarOpen={() => setSidebarOpen(true)}
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
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section logo-section">
              <img
                src="/images/Sorso_Scelto_copia-removebg-preview.png"
                alt="Sorso Scelto Logo"
                className="footer-logo"
              />
              <p>
                Esplora, confronta e scopri i chicchi di caffè più pregiati. Per
                veri intenditori.
              </p>
            </div>

            <div className="footer-section">
              <h4>Menu</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="#about">La Nostra Storia</a>
                </li>
                <li>
                  <a href="#contact">Contattaci</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Seguici</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  Facebook
                </a>
                <a href="#" className="social-link">
                  Instagram
                </a>
                <a href="#" className="social-link">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2025 Sorso Scelto – Il gusto si sceglie, chicco dopo
              chicco.
            </p>
          </div>
        </footer>

        {/* Modal per il confronto */}
        <ModalConfronto
          confronto={confronto}
          setConfronto={setConfronto}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Sidebar per i favoriti */}
        <SidebarFavoriti
          favoriti={favoriti}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          toggleFavorito={toggleFavorito}
          aggiungiConfronto={aggiungiConfronto}
          confronto={confronto}
        />
      </div>
    </Router>
  );
}

export default App;
