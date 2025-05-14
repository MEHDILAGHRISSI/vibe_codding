const mongoose = require('mongoose');

// Définir le schéma pour une commande
const commandeSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'client' },
  produits: [{
    produitId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'produit' },
    qte: Number,
    pu: Number
  }],
  totalHT: Number,
  totalTTC: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', commandeSchema);
