const mongoose = require('mongoose');

// Définir le schéma pour un client
const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
});

// Créer et exporter le modèle Client
module.exports = mongoose.model('Client', clientSchema);
