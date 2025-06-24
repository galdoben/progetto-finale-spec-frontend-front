import React from "react";

function ModalConfronto({ confronto, setConfronto, isOpen, onClose }) {
  console.log("Modal - isOpen:", isOpen, "confronto length:", confronto.length);

  // se il modal non è aperto o non ho 2 chicchi, non mostro niente
  if (!isOpen || confronto.length !== 2) return null;

  const chicco1 = confronto[0];
  const chicco2 = confronto[1];

  // funzione per svuotare tutto e ricominciare
  const svuotaConfronto = () => {
    setConfronto([]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* questa è la finestra del modal, non si chiude se clicco qui */}
      <div className="modal-content" onClick={() => {}}>
        <div className="modal-header">
          <h2>⚖️ Confronto Chicchi</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="confronto-grid">
          {/* primo chicco */}
          <div className="chicco-card-modal">
            <h3>☕ {chicco1.title}</h3>
            <div className="chicco-info">
              <p>
                <span>Categoria:</span> {chicco1.category}
              </p>
              {chicco1.origin && (
                <p>
                  <span>Origine:</span> {chicco1.origin}
                </p>
              )}
              {chicco1.flavor && (
                <p>
                  <span>Sapore:</span> {chicco1.flavor}
                </p>
              )}
              {chicco1.roastLevel && (
                <p>
                  <span>Tostatura:</span> {chicco1.roastLevel}
                </p>
              )}
              {chicco1.price && (
                <p>
                  <span>Prezzo:</span> €{chicco1.price}
                </p>
              )}
              {chicco1.processingMethod && (
                <p>
                  <span>Lavorazione:</span> {chicco1.processingMethod}
                </p>
              )}
              {chicco1.caffeineContent && (
                <p>
                  <span>Caffeina:</span> {chicco1.caffeineContent}mg
                </p>
              )}
            </div>
          </div>

          {/* scritta VS nel mezzo */}
          <div className="vs-badge">VS</div>

          {/* secondo chicco */}
          <div className="chicco-card-modal">
            <h3>☕ {chicco2.title}</h3>
            <div className="chicco-info">
              <p>
                <span>Categoria:</span> {chicco2.category}
              </p>
              {chicco2.origin && (
                <p>
                  <span>Origine:</span> {chicco2.origin}
                </p>
              )}
              {chicco2.flavor && (
                <p>
                  <span>Sapore:</span> {chicco2.flavor}
                </p>
              )}
              {chicco2.roastLevel && (
                <p>
                  <span>Tostatura:</span> {chicco2.roastLevel}
                </p>
              )}
              {chicco2.price && (
                <p>
                  <span>Prezzo:</span> €{chicco2.price}
                </p>
              )}
              {chicco2.processingMethod && (
                <p>
                  <span>Lavorazione:</span> {chicco2.processingMethod}
                </p>
              )}
              {chicco2.caffeineContent && (
                <p>
                  <span>Caffeina:</span> {chicco2.caffeineContent}mg
                </p>
              )}
            </div>
          </div>
        </div>

        {/* pulsante per ricominciare */}
        <div className="modal-actions">
          <button className="btn-reset" onClick={svuotaConfronto}>
            🗑️ Nuovo confronto
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfronto;
