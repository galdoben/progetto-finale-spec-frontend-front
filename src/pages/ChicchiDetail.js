import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { chicchiApi } from "../services/chicchiApi";

function ChicchiDetail({ favoriti, toggleFavorito }) {
  // LE PROPS
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
      console.log("chicco ricevuto:", response.data);

      // L'ID SE MANCA
      let chiccoConId = { ...response.data, id: parseInt(id) };
      setChicco(chiccoConId);

      setError(null);
    } catch (err) {
      console.log("errore nel caricamento:", err);
      setError("Non riesco a trovare questo chicco");
    } finally {
      setLoading(false);
    }
  };

  // FUNZIONE PER CONTROLLARE SE È NEI FAVORITI
  const isFavorito = () => {
    if (!chicco) return false;
    return favoriti.some((f) => f.id == chicco.id);
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
        <div className="detail-header">
          <h1>{chicco.title}</h1>
          <span className="detail-category">{chicco.category}</span>
        </div>

        <div className="detail-body">
          <div className="detail-image-placeholder">📷</div>

          <div className="detail-info">
            <h3>Dettagli</h3>
            {chicco.origin && (
              <p>
                <strong>Origine:</strong> {chicco.origin}
              </p>
            )}
            {chicco.flavor && (
              <p>
                <strong>Sapore:</strong> {chicco.flavor}
              </p>
            )}
            {chicco.roastLevel && (
              <p>
                <strong>Tostatura:</strong> {chicco.roastLevel}
              </p>
            )}
            {chicco.price && (
              <p>
                <strong>Prezzo:</strong> €{chicco.price}
              </p>
            )}
            {chicco.processingMethod && (
              <p>
                <strong>Lavorazione:</strong> {chicco.processingMethod}
              </p>
            )}
            {chicco.caffeineContent && (
              <p>
                <strong>Caffeina:</strong> {chicco.caffeineContent}mg
              </p>
            )}
          </div>
        </div>

        <div className="detail-buttons">
          <button
            className={`btn-favorite-detail ${isFavorito() ? "favorito" : ""}`}
            onClick={() => toggleFavorito(chicco)}
          >
            {isFavorito() ? "❤️" : "🤍"} Preferiti
          </button>
          <button className="btn-compare-detail">⚖️ Confronta</button>
        </div>
      </div>
    </div>
  );
}

export default ChicchiDetail;
