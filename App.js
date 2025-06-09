import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './components/Welcome';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SpecialPokemon from './components/SpecialPokemon';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/pokemon-list" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/special-pokemon" element={<SpecialPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;