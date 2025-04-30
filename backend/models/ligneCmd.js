const mongoose = require('mongoose');

// Définir le schéma pour une ligne de commande
const ligneCmdSchema = new mongoose.Schema({
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  qte: { type: Number, required: true }  // Quantité du produit
});

// Créer et exporter le modèle LigneCmd
module.exports = mongoose.model('LigneCmd', ligneCmdSchema);
