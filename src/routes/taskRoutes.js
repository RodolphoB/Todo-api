const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // importe

let tasks = [
  { id: 1, title: 'Aprender Node.js', done: false },
  { id: 2, title: 'Fazer projeto de API', done: false },
];

// ✅ Aplique o middleware nas rotas
router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Título é obrigatório' });

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
