const cron = require("node-cron");
const express = require("express");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const secret = crypto.randomBytes(64).toString('hex');

function generateToken(user) {
  const token = jwt.sign(user, secret, { expiresIn: '1h' });
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

// cron.schedule('*/1 * * * *', function () {
//   console.log("---------------------");
//   console.log("running a task every 1 minute");
// });
app.listen(3000, () => {
  console.log("application listening.....");
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (email === 'usuario@example.com' && password === '123456') {
    const user = { email: email };
    const token = generateToken(user);
    res.json({ token: token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

app.get('/recurso-protegido', verifyToken, (req, res) => {
  res.json({ mensagem: 'Este é um recurso protegido' });
});



