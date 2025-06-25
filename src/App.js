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

  // funzione per aggiungere al confronto
  const aggiungiConfronto = (chicco) => {
    console.log("voglio confrontare:", chicco.title);

    // controllo se ho già 2 chicchi
    if (confronto.length >= 2) {
      alert("Puoi confrontare solo 2 chicchi alla volta!");
      return;
    }

    // controllo se questo chicco è già nel confronto
    let presente = confronto.find((c) => c.id == chicco.id);
    if (presente) {
      alert("Questo chicco è già nel confronto!");
      return;
    }

    // aggiungo al confronto
    let nuovoConfronto = [...confronto, chicco];
    setConfronto(nuovoConfronto);

    // se ho 2 chicchi, apro il modal automaticamente
    if (nuovoConfronto.length === 2) {
      setModalOpen(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            ☕ Comparatore Chicchi
          </Link>
          <div className="nav-info">
            {/* Pulsante per aprire i favoriti */}
            <button
              className="btn-favoriti"
              onClick={() => setSidebarOpen(true)}
            >
              ❤️ {favoriti.length}
            </button>
            | Confronto: {confronto.length}/2
            {confronto.length === 2 && (
              <button
                className="btn-confronto"
                onClick={() => setModalOpen(true)}
              >
                Vedi confronto!
              </button>
            )}
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
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>☕ Comparatore Chicchi</h3>
              <p>
                Il miglior tool per confrontare e scegliere i chicchi di caffè
                perfetti per te!
              </p>
            </div>

            <div className="footer-section">
              <h4>Navigazione</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="#about">Chi Siamo</a>
                </li>
                <li>
                  <a href="#contact">Contatti</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Social</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  📘 Facebook
                </a>
                <a href="#" className="social-link">
                  📷 Instagram
                </a>
                <a href="#" className="social-link">
                  🐦 Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2025 Comparatore Chicchi. Fatto con ❤️ per gli amanti del
              caffè
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
        />
      </div>
    </Router>
  );
}

export default App;
