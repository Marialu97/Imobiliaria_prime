import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Interessado } from '../models/interessado.model';

@Injectable({
  providedIn: 'root'
})
export class InteressadosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFavoritosByCliente(clienteId: number): Observable<Interessado[]> {
    return this.http.get<Interessado[]>(`${this.apiUrl}/interesses?clienteId=${clienteId}`);
  }

getInteressadosByCorretor(corretorId: number): Observable<any[]> {
  return forkJoin([
    this.http.get<any[]>(`${this.apiUrl}/imoveis?corretorId=${corretorId}`),
    this.http.get<any[]>(`${this.apiUrl}/interesses`)
  ]).pipe(
    map(([imoveis, interesses]) => {

      const imoveisIds = imoveis.map(i => String(i.id));
      return interesses
        .filter(i => imoveisIds.includes(String(i.imovelId)))
        .map(i => ({
          id: i.id,
          clienteId: i.clienteId,
          imovelId: i.imovelId
        }));
    }),
    catchError(() => of([]))
  );
}

createInteresse(interesse: Interessado): Observable<Interessado> {
  return this.http.get<Interessado[]>(`${this.apiUrl}/interesses`).pipe(
    switchMap((interesses: any[]) => {

      const maxId = interesses.length ? Math.max(...interesses.map(i => Number(i.id))) : 0;
      interesse.id = (maxId + 1).toString();

      return this.http.post<Interessado>(`${this.apiUrl}/interesses`, interesse);
    })
  );
}

deleteInteressado(id: number): Observable<void> {

  return this.http.delete<void>(`${this.apiUrl}/interesses/${id}`);
}
}
