const express = require('express');
const router = express.Router();

// Exemple de produits statiques (remplace avec la logique de base de données)
const produits = [
  { _id: 'p1', libelle: 'Stylo', pu: 2.5 },
  { _id: 'p2', libelle: 'Cahier', pu: 4.0 },
  { _id: 'p3', libelle: 'Gomme', pu: 1.2 },
];

// Route pour obtenir la liste des produits
router.get('/', (req, res) => {
  res.json(produits);
});

module.exports = router;
