import React from "react";
import { Link } from "react-router-dom";

// Componente per la sidebar dei favoriti
function SidebarFavoriti({
  favoriti,
  isOpen,
  onClose,
  toggleFavorito,
  aggiungiConfronto,
  confronto,
}) {
  // se non è aperta non mostro niente
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>

      <div className="sidebar-favoriti">
        <div className="sidebar-header">
          <h2>❤️ I Miei Favoriti</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          {favoriti.length === 0 ? (
            // Se non ci sono favoriti
            <div className="no-favorites">
              <p>Nessun chicco nei favoriti</p>
              <p>Aggiungi qualche chicco che ti piace!</p>
            </div>
          ) : (
            // Lista dei favoriti
            <div className="favorites-list">
              {favoriti.map((chicco) => (
                <div
                  key={chicco.id}
                  className={`favorite-card ${
                    Array.isArray(confronto) &&
                    confronto.some((c) => c.id === chicco.id)
                      ? "in-confronto"
                      : ""
                  }`}
                >
                  <h3>{chicco.title}</h3>
                  <p className="favorite-category">{chicco.category}</p>

                  <div className="favorite-actions">
                    <Link
                      to={`/chicco/${chicco.id}`}
                      className="btn-dettaglio"
                      onClick={onClose}
                    >
                      Vedi dettagli
                    </Link>
                    <button
                      className="btn-confronto-small"
                      onClick={() => aggiungiConfronto(chicco)}
                    >
                      Confronta
                    </button>
                    <button
                      className="btn-rimuovi"
                      onClick={() => toggleFavorito(chicco)}
                    >
                      💔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SidebarFavoriti;
