require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database'); // importe a conexão do Sequelize

const PORT = process.env.PORT || 3000;

// Sincroniza os modelos com o banco
sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
  });

