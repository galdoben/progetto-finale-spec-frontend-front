import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { chicchiApi } from "../services/chicchiApi";

function ChicchiDetail({
  favoriti,
  toggleFavorito,
  confronto,
  aggiungiConfronto,
}) {
  const { id } = useParams();
  const [chicco, setChicco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChicco();
  }, [id]);

  const fetchChicco = async () => {
    try {
      setLoading(true);
      console.log("sto caricando chicco id:", id);

      let response = await chicchiApi.getChicco(parseInt(id));
      console.log("risposta completa:", response.data);

      // Il dato è dentro response.data.chicco
      const chiccoData = response.data.chicco || response.data;
      console.log("chicco estratto:", chiccoData);

      setChicco(chiccoData);
      setError(null);
    } catch (err) {
      console.log("errore nel caricamento:", err);
      setError("Non riesco a trovare questo chicco");
    } finally {
      setLoading(false);
    }
  };
  const isFavorito = () => {
    if (!chicco) return false;
    return favoriti.some((f) => f.id == chicco.id);
  };

  // funzione per i colori delle categorie
  const getCategoryColor = (category) => {
    if (category === "Premium") {
      return "#daa520";
    } else if (category === "Specialty") {
      return "#8b4513";
    } else if (category === "Organic") {
      return "#228b22";
    } else if (category === "Standard") {
      return "#cd853f";
    } else {
      return "#8b4513";
    }
  };

  // stelline per la tostatura
  const getRoastStars = (roastLevel) => {
    if (roastLevel === "light") {
      return "☕";
    } else if (roastLevel === "medium") {
      return "☕☕";
    } else if (roastLevel === "dark") {
      return "☕☕☕";
    } else {
      return "☕";
    }
  };

  if (loading) return <div className="loading">Sto caricando...</div>;
  if (error) return <div className="error">Errore: {error}</div>;
  if (!chicco) return <div className="error">Chicco non trovato</div>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">
        ← Torna alla lista
      </Link>

      <div className="detail-card">
        {/* Header con titolo e categoria */}
        <div className="detail-header">
          <h1>☕ {chicco.title}</h1>
          <span
            className="detail-category-badge"
            style={{ backgroundColor: getCategoryColor(chicco.category) }}
          >
            {chicco.category}
          </span>
        </div>

        {/* Layout principale a 2 colonne */}
        <div className="detail-main">
          {/* Colonna sinistra - Immagine e info base */}
          <div className="detail-left">
            <div className="detail-image-section">
              <div className="detail-image-placeholder">📷</div>
              <p className="image-caption">Chicco di {chicco.title}</p>
            </div>

            {/* Card prezzo */}
            <div className="info-card price-card">
              <h3>💰 Prezzo</h3>
              <div className="price-display">€{chicco.price}</div>
              <p className="price-note">al kg</p>
            </div>
          </div>

          {/* Colonna destra - Informazioni dettagliate */}
          <div className="detail-right">
            {/* Card origine e provenienza */}
            <div className="info-card origin-card">
              <h3>🌍 Origine e Provenienza</h3>
              <div className="info-row">
                <span className="info-label">Paese:</span>
                <span className="info-value">{chicco.origin}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Lavorazione:</span>
                <span className="info-value">{chicco.processingMethod}</span>
              </div>
            </div>

            {/* Card caratteristiche gustative */}
            <div className="info-card flavor-card">
              <h3>👅 Profilo Gustativo</h3>
              <div className="info-row">
                <span className="info-label">Sapore:</span>
                <span className="info-value">{chicco.flavor}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tostatura:</span>
                <span className="info-value">
                  {chicco.roastLevel} {getRoastStars(chicco.roastLevel)}
                </span>
              </div>
            </div>

            {/* Card contenuto caffeina */}
            <div className="info-card caffeine-card">
              <h3>⚡ Contenuto di Caffeina</h3>
              <div className="caffeine-amount">{chicco.caffeineContent}mg</div>
              <div className="caffeine-bar">
                <div
                  className="caffeine-fill"
                  style={{
                    width: `${Math.min(
                      (chicco.caffeineContent / 2500) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="caffeine-note">
                {chicco.caffeineContent > 1800
                  ? "Alto contenuto"
                  : chicco.caffeineContent > 1200
                  ? "Contenuto medio"
                  : "Contenuto basso"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottoni azioni in fondo */}
        <div className="detail-buttons">
          <button
            className={`btn-favorite-detail ${isFavorito() ? "favorito" : ""}`}
            onClick={() => toggleFavorito(chicco)}
          >
            {isFavorito() ? "❤️" : "🤍"}
            {isFavorito() ? "Rimuovi preferiti" : "Aggiungi ai preferiti"}
          </button>
          <button
            className="btn-compare-detail"
            onClick={() => aggiungiConfronto(chicco)}
          >
            ⚖️ Aggiungi al confronto
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChicchiDetail;
