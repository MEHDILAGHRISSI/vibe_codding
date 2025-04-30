import { Produit } from './produit.model';

export interface Commande {
  clientId: string;
  produits: { produit: Produit; quantite: number }[];
  totalHT: number;
  totalTTC: number;
  date: string;
}
