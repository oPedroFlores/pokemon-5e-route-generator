import React from 'react';
import SelectRoute from './Components/SelectRoute';
import rotas from '../JSON/rotas.json';
import { Box, Button, TextField, Typography } from '@mui/material';

const EditRoutes = () => {
  const [route, setRoute] = React.useState('');
  const [routeList, setRouteList] = React.useState([]);
  const [newPokemon, setNewPokemon] = React.useState({ name: '', chance: '' });
  const [editTime, setEditTime] = React.useState(); // 'dia' ou 'noite'

  const generatePokemonList = (time) => {
    const rotaSelecionada = rotas.find((rota) => rota.id === route);
    if (!rotaSelecionada) {
      console.log('Rota não encontrada');
      return;
    }
    setRouteList(rotaSelecionada[time]);
  };

  function selectTime(time) {
    generatePokemonList(time);
    setEditTime(time);
  }

  const handleNameChange = (index, newName) => {
    const updatedList = routeList.map((pokemon, idx) => {
      if (idx === index) {
        // Encontra o Pokémon que está sendo editado pelo índice
        return { ...pokemon, name: newName }; // Atualiza o nome do Pokémon
      }
      return pokemon; // Retorna os outros Pokémon sem modificação
    });
    setRouteList(updatedList); // Atualiza o estado com a nova lista
  };

  const handleChanceChange = (index, newChance) => {
    const updatedList = routeList.map((pokemon, idx) => {
      if (idx === index) {
        // Encontra o Pokémon que está sendo editado pelo índice
        return { ...pokemon, chance: newChance }; // Atualiza a chance do Pokémon
      }
      return pokemon; // Retorna os outros Pokémon sem modificação
    });
    setRouteList(updatedList); // Atualiza o estado com a nova lista
  };

  const addNewPokemonToList = () => {
    const newPokemon = { name: '', chance: '' }; // Novo objeto Pokémon com campos vazios
    setRouteList([...routeList, newPokemon]); // Atualiza o estado adicionando o novo Pokémon
  };

  const removePokemonFromList = (index) => {
    const confirmation = window.confirm(
      'Tem certeza que deseja excluir este Pokemon?',
    );
    if (!confirmation) {
      return;
    }
    const updatedList = routeList.filter((_, idx) => idx !== index);
    // Atualiza o estado com a nova lista, excluindo o Pokémon no índice especificado
    setRouteList(updatedList);
  };

  const updateJson = async () => {
    try {
      const response = await fetch('http://localhost:3001/updatejson', {
        method: 'POST', // Ou 'PUT', se preferir
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: editTime, // Supondo que 'editTime' é 'dia' ou 'noite'
          json: routeList, // Os dados que você quer atualizar
          routeId: route,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na atualização');
      }

      alert('JSON atualizado com sucesso!');
    } catch (error) {
      console.error('Erro na atualização:', error);
    }
  };

  return (
    <div>
      <h1>Edit Routes</h1>
      <SelectRoute route={route} setRoute={setRoute} rotas={rotas} />
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ width: '170px' }}
          disabled={!route}
          onClick={() => selectTime('dia')}
        >
          Dia
        </Button>
        <Button
          variant="contained"
          sx={{ width: '170px' }}
          disabled={!route}
          onClick={() => selectTime('noite')}
        >
          Noite
        </Button>
      </Box>
      {editTime && (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant="contained"
            sx={{ width: '170px' }}
            onClick={addNewPokemonToList}
          >
            Adicionar Novo Pokémon
          </Button>
        </Box>
      )}
      {routeList.map((pokemon, index) => (
        <Box
          key={index}
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '80%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Pokémon {index + 1}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removePokemonFromList(index)}
              sx={{ marginBottom: 2 }}
            >
              Remover
            </Button>
          </Box>
          <TextField
            label="Nome"
            variant="outlined"
            value={pokemon.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            sx={{ marginBottom: 2, width: '80%' }}
          />
          <TextField
            label="Chance"
            variant="outlined"
            type="number"
            value={pokemon.chance}
            onChange={(e) => handleChanceChange(index, e.target.value)}
            sx={{ marginBottom: 2, width: '80%' }}
          />
        </Box>
      ))}

      <button onClick={() => updateJson()}>Update</button>
    </div>
  );
};

export default EditRoutes;
