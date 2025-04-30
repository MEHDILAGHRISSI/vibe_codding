import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importer HttpClient
import { Observable } from 'rxjs';  // Importer Observable pour gérer les réponses

@Injectable({
  providedIn: 'root'  // Cela garantit qu'ApiService sera un Singleton
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';  // URL de ton backend

  constructor(private http: HttpClient) {}  // Injection de HttpClient dans ApiService

  // Exemple de méthode pour récupérer des clients
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Exemple de méthode pour récupérer des produits
  getProduits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produits`);
  }

  // Méthode pour passer une commande
  passerCommande(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/commandes`, data);
  }
}
