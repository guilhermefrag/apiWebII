const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/css`));
app.use(express.static(`${__dirname}/js`));

const testesData = fs.readFileSync('./dados/testes.json');
const resultadosData = fs.readFileSync('./dados/resultados.json');

const testes = JSON.parse(testesData);
const resultados = JSON.parse(resultadosData);

// get dos arquivos json
app.get('/testes', (req, res) => {
  res.json(testes);
});

app.get('/resultados', (req, res) => {
  res.json(resultados);
});

// iniciando servidor
app.listen(3000, () => {
  console.log("application listening.....");
});

//endpoints
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/html/home.html`);
});
app.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/html/login.html`);
});

app.post('/login', (req, res) => {
  res.sendFile(`${__dirname}/html/login.html`);
});

app.get('/lista-teste', (req, res) => {
  res.sendFile(`${__dirname}/html/lista_testes.html`);
});

app.get('/perguntas', (req, res) => {
  const teste = req.query.teste;
  res.sendFile(`${__dirname}/html/lista_perguntas.html`);
});

app.get('/novasperguntas', (req, res) => {
  const teste = req.query.teste;
  res.sendFile(`${__dirname}/html/cadastra_perguntas.html`);
});

app.get('/cadastra-teste', (req, res) => {
  res.sendFile(`${__dirname}/html/cadastra_testes.html`);
});

app.get('/lista-resultados', (req, res) => {
  res.sendFile(`${__dirname}/html/lista_resultados.html`);
});

app.post('/teste', (req, res) => {
  const listaTestes = JSON.stringify(req.body);

  try {
    fs.writeFileSync('./dados/testes.json', listaTestes);
    res.status(200).send('Funcionou');
  } catch (error) {
    res.status(400).send('Algo deu errado');
  }
})

app.get('/perguntas/:nomeTeste', (req, res) => {
  const nomeTeste = req.params.nomeTeste;
  const teste = testes.find(item => item.teste === nomeTeste);

  res.json(teste.perguntas);
});

app.post('/pergunta/', (req, res) => {
  const listaTestes = JSON.stringify(req.body);

  try {
    fs.writeFileSync('./dados/testes.json', listaTestes);
    res.status(200).send('Funcionou');
  } catch (error) {
    res.status(400).send('Algo deu errado');
  }
})

app.post('/resultado', (req, res) => {
  const resultados = JSON.stringify(req.body);

  try {
    fs.writeFileSync('./dados/resultados.json', resultados);
    res.status(200).send('Funcionou');
  } catch (error) {
    res.status(400).send('Algo deu errado');
  }
});

