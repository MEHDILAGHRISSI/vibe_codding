import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importer HttpClient
import { Observable } from 'rxjs';  // Importer Observable pour gérer les réponses

@Injectable({
  providedIn: 'root'  // Cela garantit qu'ApiService sera un Singleton
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';  // URL de ton backend

  constructor(private http: HttpClient) {}  // Injection de HttpClient dans ApiService

  // Dans api.service.ts
getClients(): Observable<any> {
  return this.http.get(`http://localhost:3000/client`);
}

getProduits(): Observable<any> {
  return this.http.get(`http://localhost:3000/Produit`);
}

passerCommande(data: any): Observable<any> {
  return this.http.post(`http://localhost:3000/commandes`, data); // Mais il n'existe pas encore !
}

}
