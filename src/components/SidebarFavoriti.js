import React from "react";
import { Link } from "react-router-dom";

// Componente per la sidebar dei favoriti
function SidebarFavoriti({
  favoriti,
  isOpen,
  onClose,
  toggleFavorito,
  aggiungiConfronto,
}) {
  // se non è aperta non mostro niente
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay scuro che copre tutto lo schermo */}
      <div className="sidebar-overlay" onClick={onClose}></div>

      {/* La sidebar vera e propria */}
      <div className="sidebar-favoriti">
        {/* Header della sidebar */}
        <div className="sidebar-header">
          <h2>❤️ I Miei Favoriti</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contenuto della sidebar */}
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
                <div key={chicco.id} className="favorite-card">
                  <h3>{chicco.title}</h3>
                  <p className="favorite-category">{chicco.category}</p>

                  {/* Bottoni per ogni favorito */}
                  <div className="favorite-actions">
                    {/* Vai ai dettagli */}
                    <Link
                      to={`/chicco/${chicco.id}`}
                      className="btn-dettaglio"
                      onClick={onClose}
                    >
                      Vedi dettagli
                    </Link>

                    {/* Aggiungi al confronto */}
                    <button
                      className="btn-confronto-small"
                      onClick={() => aggiungiConfronto(chicco)}
                    >
                      Confronta
                    </button>

                    {/* Rimuovi dai favoriti */}
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
