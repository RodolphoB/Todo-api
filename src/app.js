require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();

app.use(express.json());

// Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Rotas de tarefas (com middleware interno para autenticação)
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('API rodando!');
});

// Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

