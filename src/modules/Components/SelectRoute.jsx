import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectRoute({ route, setRoute, rotas }) {
  const handleChange = (event) => {
    setRoute(event.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="select-route-label">Rota</InputLabel>
        <Select
          labelId="select-route-label"
          id="select-route"
          value={route}
          label="Rota"
          onChange={handleChange}
        >
          {rotas.map((rota) => (
            <MenuItem key={rota.id} value={rota.id}>
              {rota.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
