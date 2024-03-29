import { Box, Card, Typography } from '@mui/material';
import React from 'react';

const PokeCard = (pokemon) => {
  pokemon = pokemon.pokemon;
  let tempData = require(`../../JSON/pokemon/Bulbasaur.json`);
  const [pokemonData, setPokemonData] = React.useState(tempData);
  const [pokemonApiData, setPokemonApiData] = React.useState();
  React.useEffect(() => {
    fetch(`http://localhost:3001/pokemon/${pokemon.name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => console.error(error));

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonApiData(data);
      })
      .catch((error) =>
        console.error('Erro ao buscar dados do Pokémon:', error),
      );
  }, [pokemon]);

  if (pokemon && !pokemon.name) {
    return <div>ERRO! POKEMON DEFINIDO DE FORMA ERRADA</div>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          marginTop: '20px',
          width: 600,
          padding: '10px',
          position: 'relative',
          backgroundColor: '#f5f5f5',
        }}
      >
        {pokemon.shiny && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'yellow',
              padding: '5px',
              borderRadius: '5px',
              color: 'black',
            }}
          >
            SHINY!
          </Box>
        )}
        <Typography
          sx={{ fontSize: '2rem' }}
          color="text.secondary"
          gutterBottom
        >
          {pokemon.name}
        </Typography>
        <Typography
          sx={{ fontSize: '1.5rem' }}
          color="text.secondary"
          gutterBottom
        >
          Natureza: {pokemon.nature.name} (
          {Object.entries(pokemon.nature)
            .filter(([key, _]) => key !== 'name')
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')}
          )
        </Typography>
      </Card>
      {pokemonApiData && (
        <img
          src={
            pokemon.shiny
              ? pokemonApiData.sprites.front_shiny
              : pokemonApiData.sprites.front_default
          }
          alt={`Sprite de ${pokemonApiData.name}`}
          style={{
            width: '100%',
            objectFit: 'contain',
          }} // Exemplo de estilo inline
        />
      )}
    </Box>
  );
};

export default PokeCard;
