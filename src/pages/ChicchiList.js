import React, { useState, useEffect } from "react";
import { chicchiApi } from "../services/chicchiApi";
import { Link } from "react-router-dom";

const coffeeImages = [
  "/images/chicchi.1.jpg",
  "/images/chicchi.2.jpg",
  "/images/chicchi.3.webp",
  "/images/chicchi.4.png",
  "/images/chicchi-5.jpg",
  "/images/chicchi.6.jpeg",
  "/images/chicchi.7.jpg",
  "/images/chicchi.8.jpg",
  "/images/chicchi.9.jpg",
  "/images/chicchi.10.png",
  "/images/chicchi.11.jpg",
  "/images/chicchi.12.webp",
];

function ChicchiList({
  favoriti,
  toggleFavorito,
  confronto,
  aggiungiConfronto,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await chicchiApi.getAllChicchi();
      console.log("dati caricati:", res.data);
      setData(res.data);
      setErrorMsg(null);
    } catch (error) {
      console.log("errore:", error);
      setErrorMsg("Non riesco a caricare i chicchi");
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorito = (chicco) => {
    return favoriti.some((f) => f.id === chicco.id);
  };

  let filtered = data.filter((item) => {
    let searchMatch = item.title.toLowerCase().includes(search.toLowerCase());
    let categoryMatch =
      categoryFilter === "" || item.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  filtered.sort((a, b) => {
    let valA = a[sort].toLowerCase();
    let valB = b[sort].toLowerCase();
    if (order === "asc") {
      return valA < valB ? -1 : 1;
    } else {
      return valA > valB ? -1 : 1;
    }
  });

  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  if (isLoading) return <div className="loading">Caricando...</div>;
  if (errorMsg) return <div className="error">Errore: {errorMsg}</div>;

  return (
    <div className="chicchi-container">
      <h1>Catalogo Chicchi</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Cerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-select"
        >
          <option value="">Tutte</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort + "-" + order}
          onChange={(e) => {
            let [field, sortOrder] = e.target.value.split("-");
            setSort(field);
            setOrder(sortOrder);
          }}
          className="sort-select"
        >
          <option value="title-asc">Nome A-Z</option>
          <option value="title-desc">Nome Z-A</option>
          <option value="category-asc">Categoria A-Z</option>
          <option value="category-desc">Categoria Z-A</option>
        </select>
      </div>

      <div className="chicchi-grid">
        {filtered.map((chicco) => (
          <div
            key={chicco.id}
            className="chicco-card-bg"
            style={{
              backgroundImage: `url(${
                coffeeImages[chicco.id % coffeeImages.length]
              })`,
            }}
          >
            <div className="chicco-overlay">
              <h3>{chicco.title}</h3>
              <p className="category">{chicco.category}</p>
              <div className="card-actions">
                <Link to={`/chicco/${chicco.id}`}>
                  <button className="btn-details">Dettagli</button>
                </Link>
                <button
                  className="btn-compare"
                  onClick={() => aggiungiConfronto(chicco)}
                >
                  Confronta
                </button>
                <button
                  className={`btn-favorite ${
                    isFavorito(chicco) ? "favorito" : ""
                  }`}
                  onClick={() => toggleFavorito(chicco)}
                >
                  {isFavorito(chicco) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="no-results">Nessun risultato</p>}
    </div>
  );
}

export default ChicchiList;
