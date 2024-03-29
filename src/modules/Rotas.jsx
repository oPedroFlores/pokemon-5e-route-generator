import React from 'react';
import SelectRoute from './Components/SelectRoute';
import { Box, Button } from '@mui/material';
import rotas from '../JSON/rotas.json';
import natures from '../JSON/natures.json';
import PokeCard from './Components/PokeCard';

const Rotas = () => {
  const [route, setRoute] = React.useState('');
  const [generatedPokemon, setGeneratedPokemon] = React.useState();

  const generatePokemonCard = (time) => {
    const rotaSelecionada = rotas.find((rota) => rota.id === route);
    if (!rotaSelecionada) {
      console.log('Rota não encontrada');
      return;
    }

    const pokemons = rotaSelecionada[time];
    if (!pokemons) {
      console.log('Nenhum Pokémon encontrado para este momento do dia');
      return;
    }

    const totalChance = pokemons.reduce(
      (acc, pokemon) => acc + Number(pokemon.chance),
      0,
    );

    let randomChance = Math.random() * totalChance;
    let selectedPokemon;
    for (const pokemon of pokemons) {
      if (randomChance < Number(pokemon.chance)) {
        selectedPokemon = pokemon;
        break;
      }
      randomChance -= Number(pokemon.chance);
    }
    const shinyChance = Math.floor(Math.random() * 100) + 1;
    selectedPokemon.shiny = shinyChance === 1;

    const natureKeys = Object.keys(natures);

    const number = Math.floor(Math.random() * (natureKeys.length - 1));
    const natureKey = natureKeys[number];

    selectedPokemon.nature = {
      name: natureKey,
      ...natures[natureKey],
    };

    setGeneratedPokemon(selectedPokemon);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        flexDirection: 'column',
      }}
    >
      <SelectRoute route={route} setRoute={setRoute} rotas={rotas} />
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="contained"
          sx={{ width: '170px' }}
          disabled={!route}
          onClick={() => generatePokemonCard('dia')}
        >
          Gerar Dia
        </Button>
        <Button
          variant="contained"
          sx={{ width: '170px' }}
          disabled={!route}
          onClick={() => generatePokemonCard('noite')}
        >
          Gerar Noite
        </Button>
      </Box>
      {generatedPokemon && <PokeCard pokemon={generatedPokemon} />}
    </Box>
  );
};

export default Rotas;
