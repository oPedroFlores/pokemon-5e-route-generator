const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.get('/pokemon/:name', (req, res) => {
  const { name } = req.params;
  const filePath = path.join(
    __dirname,
    'SRC',
    'JSON',
    'pokemon',
    `${name}.json`,
  );
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('Pokemon not found');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/updatejson', (req, res) => {
  const { time, json, routeId } = req.body;
  const filePath = path.join(__dirname, 'SRC', 'JSON', 'rotas.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo');
      return;
    }

    let routes = JSON.parse(data);
    const routeIndex = routes.findIndex((route) => route.id === routeId);
    if (routeIndex === -1) {
      res.status(404).send('Rota não encontrada');
      return;
    }

    // Substitui os dados de 'dia' ou 'noite' com o novo JSON fornecido
    routes[routeIndex][time] = json;

    // Salva as alterações de volta no arquivo rotas.json
    fs.writeFile(filePath, JSON.stringify(routes, null, 2), (err) => {
      if (err) {
        res.status(500).send('Erro ao salvar o arquivo');
        return;
      }
      res.status(200).json({ message: 'Rota atualizada com sucesso', routeId });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
