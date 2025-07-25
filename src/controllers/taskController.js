const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await Task.create({ title, UserId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  try {
    const task = await Task.findOne({ where: { id, UserId: req.userId } });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    task.title = title || task.title;
    task.done = done !== undefined ? done : task.done;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Task.destroy({ where: { id, UserId: req.userId } });
    if (!deleted) return res.status(404).json({ error: 'Tarefa não encontrada' });

    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

