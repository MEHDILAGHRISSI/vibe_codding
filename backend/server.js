const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vibe_coding')
  .then(() => console.log("MongoDB connecté"))
  .catch(err => {
    console.error("Erreur de connexion à MongoDB", err);
    process.exit(1); // Arrêter le serveur si la connexion échoue
  });

// Route pour la racine ("/") de l'API
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Route pour obtenir tous les produits
app.get('/Produit', async (req, res) => {
  try {
    // Récupérer les produits de la collection 'produit'
    const produits = await mongoose.connection.db.collection('Produit').find().toArray();
    if (produits.length === 0) {
      return res.status(404).json({ message: 'Aucun produit trouvé.' });
    }
    res.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

// Route pour obtenir tous les clients
app.get('/client', async (req, res) => {
  try {
    // Récupérer les clients de la collection 'client'
    const clients = await mongoose.connection.db.collection('client').find().toArray();
    if (clients.length === 0) {
      return res.status(404).json({ message: 'Aucun client trouvé.' });
    }
    res.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
  }
});

// Route pour ajouter un produit
app.post('/Produit', async (req, res) => {
  try {
    const produit = req.body;
    if (!produit.name || !produit.price) {
      return res.status(400).json({ message: 'Nom et prix sont requis.' });
    }
    
    // Ajouter un produit à la collection 'produit'
    const result = await mongoose.connection.db.collection('produit').insertOne(produit);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit", error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' });
  }
});

// Route pour ajouter un client
app.post('/clients', async (req, res) => {
  try {
    const client = req.body;
    if (!client.name || !client.email) {
      return res.status(400).json({ message: 'Nom et email sont requis.' });
    }
    
    // Ajouter un client à la collection 'client'
    const result = await mongoose.connection.db.collection('client').insertOne(client);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error("Erreur lors de l'ajout du client", error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du client' });
  }
});

// Route pour supprimer un produit
app.delete('/Produit/:id', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('produit').deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit", error);
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
});

// Route pour supprimer un client
app.delete('/client/:id', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('client').deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }
    res.json({ message: 'Client supprimé' });
  } catch (error) {
    console.error("Erreur lors de la suppression du client", error);
    res.status(500).json({ message: 'Erreur lors de la suppression du client' });
  }
});

// Lancer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});

// Ajouter après les autres routes :
// Ajoute une route POST pour gérer l'ajout de commandes
const Commande = require('./models/commande'); // adapte le chemin si besoin

app.post('/commandes', async (req, res) => {
  console.log("==== ➤ Requête POST reçue sur /commandes ====");
  console.log("Corps reçu :", req.body);

  try {
    if (!req.body.clientId) {
      console.warn("⚠️ Aucun clientId fourni !");
      return res.status(400).json({ message: "clientId requis" });
    }

    const commande = new Commande({
      clientId: new mongoose.Types.ObjectId(req.body.clientId),
      produits: req.body.produits.map(p => ({
        produitId: new mongoose.Types.ObjectId(p.produitId),
        qte: p.qte,
        pu: p.pu
      })),
      totalHT: req.body.totalHT,
      totalTTC: req.body.totalTTC,
      date: req.body.date || new Date()
    });

    const result = await commande.save();
    console.log("✅ Commande enregistrée :", result);
    res.status(201).json(result);

  } catch (err) {
    console.error("❌ Erreur dans POST /commandes :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
});




app.get('/commandes', async (req, res) => {
  try {
    const commandes = await mongoose.connection.db.collection('commandes').find().toArray();
    res.status(200).json(commandes);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
});


