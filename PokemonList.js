import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke, index) => {
            const details = await axios.get(poke.url);
            return {
              id: index + 1,
              name: poke.name,
              image: details.data.sprites.front_default,
              type: details.data.types[0].type.name,
            };
          })
        );
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return <div className="loading">Cargando Pokémon...</div>;

  return (
    <div className="pokemon-list">
      <button className="back-button" onClick={() => window.location.href = '/'}>Volver</button>
      {pokemon.map((poke) => (
        <div key={poke.id} className="pokemon-card" style={{ '--type-color': getTypeColor(poke.type) }}>
          <Link to={`/pokemon/${poke.id}`}>
            <img src={poke.image} alt={poke.name} />
          </Link>
          <h3>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
          <p>ID: {poke.id}</p>
        </div>
      ))}
      <Link to="/special-pokemon">
        <button className="special-button">Conocer Pokémon Especiales</button>
      </Link>
    </div>
  );
};

const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850',
    electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC',
  };
  return typeColors[type] || '#A8A878';
};

export default PokemonList;