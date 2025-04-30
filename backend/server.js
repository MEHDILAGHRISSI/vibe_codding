const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo_app')
.then(() => console.log("MongoDB connecté"))
.catch(err => console.error(err));

// Modèle de tâche (si nécessaire)
const Task = mongoose.model('Task', {
    title: String,
    completed: Boolean,
});

// Route pour la racine ("/") de l'API
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Route pour obtenir les tâches
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Route pour ajouter une tâche
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tâche supprimée' });
});

// Lancer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur backend sur http://localhost:${PORT}`));
