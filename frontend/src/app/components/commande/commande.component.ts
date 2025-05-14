import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommandeService } from '../../commande.service';

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
  clients: any[] = [];
  lignes: { produit: Produit; qte: number }[] = [];
  produitsDisponiblesList: Produit[] = [];

  private api = inject(ApiService);
  private commandeService = inject(CommandeService);
 // Injection du service

  ngOnInit() {
    this.api.getClients().subscribe(data => this.clients = data);
    this.api.getProduits().subscribe(data => this.produitsDisponiblesList = data);
  }

  produitsDisponibles(index: number): Produit[] {
    return this.produitsDisponiblesList;
  }

  addLigne() {
    if (this.produitsDisponiblesList.length > 0) {
      this.lignes.push({ produit: this.produitsDisponiblesList[0], qte: 1 });
    }
  }

  removeLigne(i: number) {
    this.lignes.splice(i, 1);
  }

  totalHT() {
    return this.lignes.reduce((total, ligne) => total + ligne.produit.pu * ligne.qte, 0);
  }

  totalTTC() {
    return this.totalHT() * 1.2; // TVA 20%
  }

  passCommande() {
    if (!this.selectedClient || this.lignes.length === 0) {
      alert("Veuillez sélectionner un client et ajouter au moins un produit.");
      return;
    }

    // Structure des données à envoyer au backend
    const commandeData = {
      clientId: this.selectedClient._id,
      produits: this.lignes.map(ligne => ({
        produitId: ligne.produit._id,
        qte: ligne.qte,
        pu: ligne.produit.pu
      })),
      totalHT: this.totalHT(),
      totalTTC: this.totalTTC(),
      date: new Date()
    };
    

    this.commandeService.addCommande(commandeData).subscribe(
      () => {
        alert('Commande enregistrée avec succès !');
        this.selectedClient = null;
        this.lignes = [];
      },
      (err: any)=> {
        console.error('Erreur lors de l\'envoi :', err);
        alert('Erreur lors de l\'enregistrement de la commande.');
      }
    );
    
}}
