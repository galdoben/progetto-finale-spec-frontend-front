import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChicchiList from './pages/ChicchiList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="logo">
            ☕ Comparatore Chicchi
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ChicchiList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
