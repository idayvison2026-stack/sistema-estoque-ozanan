const express = require('express');

const produtosRoutes = require('./routes/produtos');

const fornecedoresRoutes = require('./routes/fornecedores');

const associacoesRoutes = require('./routes/associacoes');

const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(cors());

app.use(express.json());

app.use('/produtos', produtosRoutes);

app.use('/fornecedores', fornecedoresRoutes);

app.use('/associacoes', associacoesRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando');
});