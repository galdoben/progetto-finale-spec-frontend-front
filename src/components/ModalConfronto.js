import React from "react";

function ModalConfronto({ confronto, setConfronto, isOpen, onClose }) {
  if (!isOpen || confronto.length !== 2) return null;

  const chicco1 = confronto[0];
  const chicco2 = confronto[1];

  console.log("chicco1 completo:", JSON.stringify(chicco1, null, 2));
  console.log("chicco2 completo:", JSON.stringify(chicco2, null, 2));
  const getChiccoImage = (id) => {
    const imageMap = {
      1: "/images/chicchi.1.jpg",
      2: "/images/chicchi.2.jpg",
      3: "/images/chicchi.3.webp",
      4: "/images/chicchi.4.png",
      5: "/images/chicchi.5.jpg",
      6: "/images/chicchi.6.jpeg",
      7: "/images/chicchi.7.jpg",
      8: "/images/chicchi.8.jpg",
      9: "/images/chicchi.9.jpg",
      10: "/images/chicchi.10.png",
      11: "/images/chicchi.11.jpg",
      12: "/images/chicchi.12.webp",
    };
    return imageMap[id] || "/images/chicchi.1.jpg";
  };

  const getCategoryColor = (category) => {
    if (category === "Premium") return "#daa520";
    if (category === "Specialty") return "#8b4513";
    if (category === "Organic") return "#228b22";
    return "#cd853f";
  };

  const nuovoConfronto = () => {
    setConfronto([]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-nuova" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-nuova">
          <h2>⚖️ Confronto Caffè</h2>
          <button className="modal-close-nuova" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="confronto-grid-nuova">
          <div className="chicco-card-nuova">
            <div className="chicco-foto">
              <img src={getChiccoImage(chicco1.id)} alt={chicco1.title} />
            </div>
            <h3>{chicco1.title}</h3>
            <div
              className="badge-categoria"
              style={{ backgroundColor: getCategoryColor(chicco1.category) }}
            >
              {chicco1.category}
            </div>

            <div className="info-chicco">
              <div className="info-riga">
                <span>🌍 Origine:</span>
                <span>{chicco1.origin}</span>
              </div>
              <div className="info-riga">
                <span>👅 Sapore:</span>
                <span>{chicco1.flavor}</span>
              </div>
              <div className="info-riga">
                <span>💰 Prezzo:</span>
                <span>€{chicco1.price}</span>
              </div>
              <div className="info-riga">
                <span>⚡ Caffeina:</span>
                <span>{chicco1.caffeineContent}mg</span>
              </div>
            </div>
          </div>

          <div className="vs-centro">
            <div className="vs-cerchio">VS</div>
          </div>

          <div className="chicco-card-nuova">
            <div className="chicco-foto">
              <img src={getChiccoImage(chicco2.id)} alt={chicco2.title} />
            </div>
            <h3>{chicco2.title}</h3>
            <div
              className="badge-categoria"
              style={{ backgroundColor: getCategoryColor(chicco2.category) }}
            >
              {chicco2.category}
            </div>

            <div className="info-chicco">
              <div className="info-riga">
                <span>🌍 Origine:</span>
                <span>{chicco2.origin}</span>
              </div>
              <div className="info-riga">
                <span>👅 Sapore:</span>
                <span>{chicco2.flavor}</span>
              </div>
              <div className="info-riga">
                <span>💰 Prezzo:</span>
                <span>€{chicco2.price}</span>
              </div>
              <div className="info-riga">
                <span>⚡ Caffeina:</span>
                <span>{chicco2.caffeineContent}mg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="azioni-modal">
          <button className="btn-nuovo" onClick={nuovoConfronto}>
            🗑️ Nuovo confronto
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfronto;
