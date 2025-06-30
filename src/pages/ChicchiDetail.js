import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { chicchiApi } from "../services/chicchiApi";

const chicchiCuriosita = {
  1: {
    // Arabica Etiopia Sidamo
    curiosita: [
      "🏛️ L'Etiopia è considerata la 'culla del caffè' - secondo la leggenda, un pastore di nome Kaldi scoprì il caffè notando che le sue capre diventavano vivaci dopo aver mangiato certe bacche rosse!",
      "🌸 Il sapore floreale del Sidamo deriva dall'altitudine elevata (1400-2000m) dove cresce - più in alto, più aromi complessi!",
      "☕ In Etiopia il caffè si beve durante la cerimonia del 'Buna' che può durare ore - è un momento sacro di socializzazione",
      "🎭 Le note di bergamotto sono così intense che alcuni sommelier lo chiamano 'il Earl Grey del caffè'",
    ],
  },
  2: {
    // Robusta Vietnam
    curiosita: [
      "🏔️ Il Vietnam è il secondo produttore mondiale di caffè, ma produce principalmente Robusta - sono diventati maestri in questa varietà!",
      "🥵 La Robusta ha quasi il doppio della caffeina dell'Arabica - ecco perché ti dà quella 'botta' energetica!",
      "🍫 Il processo naturale (chicchi essiccati con la polpa) dona quel caratteristico sapore di cioccolato amaro",
      "☕ In Vietnam si beve il 'Cà phê sữa đá' - caffè con latte condensato e ghiaccio, una delizia!",
    ],
  },
  3: {
    // Arabica Colombia Supremo
    curiosita: [
      "🏞️ 'Supremo' si riferisce alla dimensione del chicco - sono i più grandi e uniformi, segno di alta qualità!",
      "🌋 Cresce nelle Ande colombiane tra vulcani attivi - la cenere vulcanica rende il terreno incredibilmente fertile",
      "👨‍🌾 Juan Valdez non è solo un personaggio pubblicitario - rappresenta davvero i 540.000 coltivatori colombiani!",
      "🍊 Le note agrumate derivano dai frutti tropicali che crescono nelle stesse piantagioni",
    ],
  },
  4: {
    // Arabica Guatemala Antigua
    curiosita: [
      "🏛️ Antigua è una città coloniale patrimonio UNESCO - il caffè qui si coltiva da oltre 250 anni!",
      "🌋 È circondato da 3 vulcani attivi che creano un microclima unico con sbalzi termici perfetti per il caffè",
      "🏺 Le piantagioni usano ancora metodi tradizionali Maya - alcune tecniche hanno migliaia di anni!",
      "🌶️ Le 'spezie dolci' nel sapore ricordano la cannella e il cardamomo che crescono nella stessa regione",
    ],
  },
  5: {
    // Arabica Jamaica Blue Mountain
    curiosita: [
      "👑 È considerato il 'Rolls Royce' del caffè - il Giappone ne importa l'80% pagandolo a peso d'oro!",
      "🏔️ Cresce solo su una montagna (Blue Mountain) a 2000+ metri - l'area di coltivazione è minuscola!",
      "🌫️ Le montagne sono sempre avvolte nella nebbia, che protegge i chicchi dal sole diretto",
      "🍯 Il sapore di miele deriva dalla lenta maturazione - qui un chicco impiega 10 mesi per maturare invece di 6!",
    ],
  },
  6: {
    // Robusta India Monsooned
    curiosita: [
      "🌊 Il 'Monsooning' è un processo unico: i chicchi vengono esposti ai venti monsonici per mesi!",
      "🎨 Questo processo cambia il colore dei chicchi da verde a giallo dorato - è pura magia della natura",
      "⛵ Nato per caso: durante i lunghi viaggi in nave verso l'Europa, i chicchi si trasformavano naturalmente",
      "🌍 Solo l'India produce caffè 'monsoonato' - è impossibile replicare questo processo altrove!",
    ],
  },
  7: {
    // Arabica Kenya AA
    curiosita: [
      "🔤 'AA' indica la dimensione del chicco - sono enormi e perfettamente uniformi, come piccole gemme!",
      "🍇 Il sapore di frutti di bosco deriva dal terreno vulcanico ricco di fosforo - è come un fertilizzante naturale",
      "🌡️ L'altitudine (1400-2100m) e l'equatore creano 2 raccolti all'anno - primavera e autunno!",
      "💎 Il Kenya ha inventato il 'wet processing' - il metodo di lavaggio che esalta l'acidità fruttata",
    ],
  },
  8: {
    // Arabica Costa Rica Tarrazú
    curiosita: [
      "🌋 Tarrazú significa 'valle vulcanica' - il terreno è letteralmente fatto di cenere vulcanica!",
      "🍯 Il processo 'honey' non usa miele ma lascia una pellicola appiccicosa sul chicco durante l'essiccazione",
      "🐛 È vietato per legge coltivare Robusta in Costa Rica - solo Arabica di alta qualità!",
      "🍃 La 'mela verde' nel sapore deriva dall'altitudine - più in alto, più acidi malici (come nelle mele)",
    ],
  },
  9: {
    // Arabica Peru Organic
    curiosita: [
      "🏔️ Cresce nelle Ande peruviane a oltre 1800m - spesso coltivato da comunità indigene Quechua",
      "🌱 Il Perù è il leader mondiale del caffè biologico - oltre il 25% della produzione è certificata organic!",
      "🍫 Il sapore di cioccolato fondente deriva dal terreno ricco di minerali andini",
      "🦙 Le piantagioni sono spesso raggiunte solo a piedi o con i lama - un vero caffè d'alta quota!",
    ],
  },
  10: {
    // Robusta Brazil Santos
    curiosita: [
      "🚢 Il porto di Santos è il più grande al mondo per l'esportazione di caffè - da qui parte il 30% del caffè mondiale!",
      "🌳 Le piantagioni brasiliane sono così vaste che si usano aerei per la raccolta - è caffè industriale fatto bene",
      "🥜 Il sapore di nocciola deriva dal clima tropicale e dalla lavorazione a secco sotto il sole brasiliano",
      "📈 Il Brasile produce così tanto caffè che i suoi raccolti influenzano i prezzi mondiali!",
    ],
  },
  11: {
    // Arabica Hawaiian Kona
    curiosita: [
      "🌺 È l'unico caffè coltivato negli USA - nelle pendici vulcaniche del Mauna Loa alle Hawaii!",
      "🌋 I chicchi crescono nella lava vulcanica solidificata - il terreno più fertile del pianeta",
      "🥥 Il sapore di noci macadamia è naturale - queste noci crescono nelle stesse piantagioni!",
      "☁️ Le nuvole del Pacifico proteggono i chicchi dal sole diretto - un condizionatore naturale!",
    ],
  },
  12: {
    // Arabica Panama Geisha
    curiosita: [
      "👘 'Geisha' deriva dall'Etiopia (città di Gesha) ma è diventato famoso a Panama - un vero viaggio intercontinentale!",
      "💰 È il caffè più costoso al mondo - può costare oltre 1000$ al kg all'asta!",
      "🌸 Il sapore di gelsomino è così intenso che alcuni lo bevono come un tè profumato",
      "🏆 Ha vinto più premi internazionali di qualsiasi altro caffè - è il 'campione del mondo'!",
    ],
  },
};

const getCuriosita = (chiccoId) => {
  return chicchiCuriosita[chiccoId]?.curiosita || [];
};

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

        {/*2 colonne */}
        <div className="detail-main">
          {/* Colonna sx */}
          <div className="detail-left">
            <div className="detail-image-section">
              <div className="detail-image">
                <img
                  src={getChiccoImage(chicco.id)}
                  alt={chicco.title}
                  onError={(e) => {
                    e.target.src = "/images/chicchi.1.jpg";
                  }}
                />
              </div>
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
        {/* Card Curiosità */}
        <div className="info-card curiosita-card">
          <h3>🤔 Curiosità e Fatti Interessanti</h3>
          <div className="curiosita-list">
            {getCuriosita(chicco.id).map((curiosita, index) => (
              <div key={index} className="curiosita-item">
                <p>{curiosita}</p>
              </div>
            ))}
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
