import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || 'Sin descripción';
        setPokemon({ ...response.data, description: description.replace('\n', ' ').replace('\f', ' ') });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  const handlePrev = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) navigate(`/pokemon/${prevId}`);
  };

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= 1010) navigate(`/pokemon/${nextId}`); // Extendido a Generación IX
  };

  if (loading) return <div className="loading">Cargando Pokémon...</div>;
  if (!pokemon) return <div>Pokémon no encontrado</div>;

  const isSpecial = [25, 150, 151, ...Array.from({ length: 106 }, (_, i) => 905 + i)].includes(parseInt(id)); // Generación IX: 905-1010

  return (
    <div className="pokemon-detail">
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>ID: {pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>
      <p>Tipo: {pokemon.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
      <p>Descripción: {pokemon.description}</p>
      <div className="attacks-section">
        <h3>Ataques</h3>
        <ul>
          {pokemon.moves.slice(0, 4).map((move, index) => (
            <li key={index}>
              {move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1).replace('-', ' ')}
            </li>
          ))}
        </ul>
      </div>
      {isSpecial && (
        <div className="special-section">
          <h3>Pokémon Especial</h3>
          <p>{pokemon.name === 'pikachu' ? 'Pikachu es el compañero icónico de Ash Ketchum y conocido por su velocidad y electricidad.' : ''}</p>
        </div>
      )}
      <div className="navigation">
        <button onClick={() => navigate(isSpecial ? '/special-pokemon' : '/pokemon-list')} className="nav-button">Volver a Lista</button>
        <div>
          <button onClick={handleNext} disabled={parseInt(id) === 1010} className="nav-button">Avanzar</button>
          <button onClick={handlePrev} disabled={parseInt(id) === 1} className="nav-button">Volver</button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;