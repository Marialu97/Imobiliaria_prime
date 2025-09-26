import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeuImovel } from '../models/meu-imovel.model';

@Injectable({
  providedIn: 'root'
})
export class MeusImoveisService {
  private apiUrl = "http://localhost:3009/meus-imoveis";
  constructor(private http: HttpClient) {}

  getMeusImoveis(): Observable<MeuImovel[]> {
    return this.http.get<MeuImovel[]>(this.apiUrl);
  }

  postMeuImovel(meuImovel: MeuImovel): Observable<MeuImovel[]> {
    return this.http.post<MeuImovel[]>(this.apiUrl, meuImovel);
  }

  putMeuImovel(id: any, meuImovel: MeuImovel): Observable<MeuImovel[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<MeuImovel[]>(url, meuImovel);
  }

  deleteMeuImovel(id: any): Observable<MeuImovel[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<MeuImovel[]>(url);
  }
}
