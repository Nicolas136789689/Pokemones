import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SpecialPokemon.css';

const SpecialPokemon = () => {
  const [specialPokemon, setSpecialPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialPokemon = async () => {
      try {
        const specialIds = Array.from({ length: 106 }, (_, i) => 905 + i); // Generación IX: 905-1010
        const pokemonData = await Promise.all(
          specialIds.map(async (id) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return {
              id: response.data.id,
              name: response.data.name,
              image: response.data.sprites.front_default,
              type: response.data.types[0].type.name,
            };
          })
        );
        setSpecialPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching special Pokémon:', error);
        setLoading(false);
      }
    };
    fetchSpecialPokemon();
  }, []);

  if (loading) return <div className="loading">Cargando Pokémon Especiales...</div>;

  return (
    <div className="special-pokemon-container">
      <h2>Pokémon Especiales</h2>
      <div className="special-list" style={{ animation: 'fadeInUp 1s ease-out' }}>
        {specialPokemon.map((poke) => (
          <div key={poke.id} className="special-card" style={{ '--type-color': getTypeColor(poke.type) }}>
            <Link to={`/pokemon/${poke.id}`}>
              <img src={poke.image} alt={poke.name} />
            </Link>
            <h3>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
            <p>ID: {poke.id}</p>
          </div>
        ))}
      </div>
      <Link to="/pokemon-list">
        <button className="back-button">Volver a Lista Principal</button>
      </Link>
    </div>
  );
};

const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878', electric: '#F8D030', psychic: '#F85888', water: '#6890F0',
    fire: '#F08030', grass: '#78C850', ice: '#98D8D8', fighting: '#C03028',
    poison: '#A040A0', ground: '#E0C068', flying: '#A890F0', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC',
  };
  return typeColors[type] || '#A8A878';
};

export default SpecialPokemon;