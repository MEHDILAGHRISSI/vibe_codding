const mongoose = require('mongoose');

// Définir le schéma pour un produit
const produitSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  pu: { type: Number, required: true }  // Prix unitaire
});

// Créer et exporter le modèle Produit
module.exports = mongoose.model('Produit', produitSchema);
