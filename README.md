# Structure du projet
## Supposons que ton projet a deux parties principales : un backend (Node.js + MongoDB) et un frontend (Angular). Voici à quoi cela pourrait ressembler :


/vibe_coding
---
    /frontend                # Dossier pour l'application frontend (Angular)
    /backend                 # Dossier pour l'application backend (Node.js + MongoDB)
## Backend (Node.js + MongoDB)
Le backend gère les opérations liées aux clients, produits et commandes. Il expose des routes API et interagit avec la base de données MongoDB.

**Structure du backend :**

/backend
    /models                  # Modèles Mongoose pour MongoDB
        client.js            # Modèle pour les clients
        produit.js           # Modèle pour les produits
        commande.js          # Modèle pour les commandes
    /routes                  # Routes de l'API pour gérer les clients, produits et commandes
        clientRoutes.js      # Routes pour gérer les clients
        produitRoutes.js     # Routes pour gérer les produits
        commandeRoutes.js    # Routes pour gérer les commandes
    server.js               # Fichier principal qui démarre le serveur Node.js
    .env                     # Fichier d'environnement pour les variables sensibles (ex: URI MongoDB)
    package.json             # Dépendances et scripts du backend
**Explication des fichiers :**
/models : Ce dossier contient les modèles Mongoose. Chaque modèle définit la structure des documents dans MongoDB pour un type spécifique de données (client, produit, commande).

client.js : Définition du schéma pour un client (nom, email, etc.).

produit.js : Définition du schéma pour un produit (nom, prix, etc.).

commande.js : Définition du schéma pour une commande (produits, quantités, client, etc.).

/routes : Ce dossier contient les routes API qui définissent comment gérer les différentes entités (clients, produits, commandes).

clientRoutes.js : Définit les routes pour récupérer et manipuler les données des clients.

produitRoutes.js : Définit les routes pour récupérer et manipuler les produits.

commandeRoutes.js : Définit les routes pour gérer les commandes.

server.js : Fichier principal qui démarre le serveur Express. Ce fichier inclut la configuration des routes, la connexion à la base de données MongoDB, et la gestion des erreurs.

.env : Fichier d'environnement pour stocker les variables sensibles comme l'URL de la base de données MongoDB.

package.json : Liste des dépendances du projet backend, ainsi que les scripts de démarrage du serveur.

**Exemple de server.js :**

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes
const clientRoutes = require('./routes/clientRoutes');
const produitRoutes = require('./routes/produitRoutes');
const commandeRoutes = require('./routes/commandeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log('Erreur de connexion MongoDB:', err));

// Utilisation des routes
app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur backend sur http://localhost:${PORT}`);
});
## Frontend (Angular)
Le frontend est une application Angular qui permet à l'utilisateur d'interagir avec le backend en utilisant des formulaires pour gérer les clients, produits et commandes.

**Structure du frontend :**

/frontend
    /src
        /app
            /components
                commande.component.ts      # Composant pour afficher et gérer les commandes
                client.component.ts        # Composant pour afficher et gérer les clients
                produit.component.ts       # Composant pour afficher et gérer les produits
            /services
                api.service.ts             # Service pour effectuer des appels HTTP vers le backend
            app.component.ts               # Composant principal de l'application Angular
            app.module.ts                 # Définition du module Angular
            main.ts                       # Point d'entrée de l'application Angular
        /assets
            /images                      # Dossier pour stocker des images et ressources statiques
        index.html                       # Fichier HTML principal
        styles.css                       # Fichier CSS global
    package.json                        # Dépendances et scripts du frontend
**Explication des fichiers :**
/app/components : Ce dossier contient les composants Angular pour gérer les vues de l'application. Chaque composant correspond à une fonctionnalité spécifique.

commande.component.ts : Composant pour gérer l'affichage et l'ajout des commandes. Il interagit avec le service API pour obtenir les produits disponibles et passer une commande.

client.component.ts : Composant pour afficher la liste des clients et permettre à l'utilisateur de sélectionner un client.

produit.component.ts : Composant pour afficher la liste des produits et permettre à l'utilisateur de les ajouter à la commande.

/app/services : Ce dossier contient les services Angular qui sont responsables des appels HTTP vers le backend.

api.service.ts : Service Angular qui utilise HttpClient pour envoyer des requêtes HTTP au backend. Ce service est utilisé dans les composants pour récupérer les données des clients, produits, et passer des commandes.

app.component.ts : Le composant principal qui contient la logique de l'application (par exemple, afficher des éléments communs comme un en-tête, ou le corps de la page).

app.module.ts : Le module principal d'Angular qui configure les modules et les composants de l'application. Il inclut des éléments comme HttpClientModule, les routes, et les imports nécessaires pour les composants.

main.ts : Le point d'entrée de l'application Angular. C'est ici que l'application Angular est démarrée et que les modules sont chargés.

**Exemple de api.service.ts :**

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import de HttpClient pour effectuer les requêtes
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';  // URL du backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les clients
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Récupérer tous les produits
  getProduits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produits`);
  }

  // Passer une commande
  passerCommande(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/commandes`, data);
  }
}
## Conclusion
Cette architecture sépare bien les préoccupations entre le backend et le frontend :

Le backend s'occupe de la logique métier, de la gestion des données dans MongoDB et expose une API REST.

Le frontend est une application Angular qui interagit avec cette API pour permettre à l'utilisateur de passer des commandes.

La séparation en différents composants et services permet d'assurer une meilleure organisation du code, facilite l'extensibilité et la maintenance du projet à long terme.

