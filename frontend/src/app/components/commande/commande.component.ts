import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Définition de l'interface Produit
interface Produit {
  _id: string;
  libelle: string;
  pu: number; // Prix unitaire
}

@Component({
  standalone: true,
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CommandeComponent implements OnInit {
  // Propriétés de l'état de la commande
  selectedClient: any;
  clients: any[] = []; // Liste des clients
  lignes: { produit: Produit; qte: number }[] = []; // Lignes de commande avec produit et quantité

  // Exemple de produits disponibles (initialement vides, remplis par l'API)
  produitsDisponiblesList: Produit[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Charger les clients et produits depuis l'API
    this.api.getClients().subscribe(data => this.clients = data);
    this.api.getProduits().subscribe(data => this.produitsDisponiblesList = data);
  }

  // Méthode pour obtenir les produits disponibles
  produitsDisponibles(index: number): Produit[] {
    // Retourner la liste de produits
    return this.produitsDisponiblesList;
  }

  // Ajouter une nouvelle ligne dans la commande
  addLigne() {
    this.lignes.push({ produit: this.produitsDisponiblesList[0], qte: 1 }); // Ajoute une ligne avec le premier produit et une quantité de 1
  }

  // Supprimer une ligne de commande
  removeLigne(i: number) {
    this.lignes.splice(i, 1); // Retirer la ligne à l'index i
  }

  // Calculer le total HT (Hors taxes) de la commande
  totalHT() {
    return this.lignes.reduce((total, ligne) => total + ligne.produit.pu * ligne.qte, 0);
  }

  // Calculer le total TTC (Toutes taxes comprises) de la commande
  totalTTC() {
    return this.totalHT() * 1.2; // Supposons une TVA de 20%
  }

  // Passer la commande
  passCommande() {
    if (!this.selectedClient || this.lignes.length === 0) {
      alert("Veuillez sélectionner un client et ajouter au moins un produit.");
      return;
    }

    // Structure des données à envoyer au backend
    const commandeData = {
      clientId: this.selectedClient._id,
      lignes: this.lignes.map(ligne => ({
        produitId: ligne.produit._id,
        qte: ligne.qte
      })),
      date: new Date()
    };

    this.api.passerCommande(commandeData).subscribe(
      res => {
        alert('Commande enregistrée avec succès !');
        this.selectedClient = null;
        this.lignes = [];
      },
      err => {
        console.error('Erreur lors de l\'envoi :', err);
        alert('Erreur lors de l\'enregistrement de la commande.');
      }
    );
  }
}
