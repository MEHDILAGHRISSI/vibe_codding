const mongoose = require('mongoose');

// Définir le schéma pour une commande
const commandeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  lignes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LigneCmd' }]  // Lien avec les lignes de commande
});

// Créer et exporter le modèle Commande
module.exports = mongoose.model('Commande', commandeSchema);
