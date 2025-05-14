// src/app/services/commande.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/commandes'; // adapte ce chemin si nécessaire

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCommande(commande: any): Observable<any> {
    return this.http.post(this.apiUrl, commande);
  }

  // Ajoute d'autres méthodes si nécessaire : delete, update, etc.
}
