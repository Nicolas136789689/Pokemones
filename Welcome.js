import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Welcome.css';

const Welcome = () => {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const ids = [483, 484, 493]; // Dialga, Palkia, Arceus
        const creatorData = await Promise.all(
          ids.map(async (id) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || 'Sin descripción';
            return {
              id: response.data.id,
              name: response.data.name,
              image: response.data.sprites.front_default,
              type: response.data.types[0].type.name,
              description: description.replace('\n', ' ').replace('\f', ' '),
            };
          })
        );
        setCreators(creatorData);
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="welcome-container">
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" className="react-logo" />
      </Link>
      <h1>Bienvenido Maestro Pokémon</h1>
      <div className="creators-list">
        {creators.map((creator) => (
          <div key={creator.id} className={`creator-card ${selectedCreator === creator.id ? 'selected' : ''}`} onClick={() => setSelectedCreator(selectedCreator === creator.id ? null : creator.id)}>
            <img src={creator.image} alt={creator.name} className="creator-image" />
            {selectedCreator === creator.id && (
              <div className="creator-details">
                <h3>{creator.name.charAt(0).toUpperCase() + creator.name.slice(1)}</h3>
                <p>Tipo: {creator.type.charAt(0).toUpperCase() + creator.type.slice(1)}</p>
                <p>Descripción: {creator.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link to="/pokemon-list">
        <button className="advance-button">Avanzar</button>
      </Link>
    </div>
  );
};

export default Welcome;