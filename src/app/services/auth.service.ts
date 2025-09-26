import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/clientes';
  private readonly CHAVE_AUTH = 'clienteLogado';

  constructor(private router: Router, private http: HttpClient) {}

registrar(cliente: any): Observable<any> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    switchMap((clientes) => {

      if (clientes.some(c => c.email === cliente.email)) {
        return throwError(() => new Error('Cliente já cadastrado'));
      }

      const maxId = clientes.length ? Math.max(...clientes.map(c => Number(c.id))) : 0;
      cliente.id = maxId + 1;

      return this.http.post<any>(this.apiUrl, cliente);
    })
  );
}

  login(credenciais: { email: string; senha: string }): Observable<any> {
    const corretor = {
      id: '1',
      nome: 'Corretor',
      email: 'corretor@rh.connect.com',
      senha: 'corretor1234',
      permissao: 'corretor',
    };

    return this.http.get<any[]>(this.apiUrl).pipe(
      map((clientes) => {

        if (
          credenciais.email === corretor.email &&
          credenciais.senha === corretor.senha
        ) {
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(corretor));
          return corretor;
        }

        const cliente = clientes.find(
          (c) => c.email === credenciais.email && c.senha === credenciais.senha
        );

        if (cliente) {
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(cliente));
          return cliente;
        }

        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.CHAVE_AUTH);
    this.router.navigate(['/interna']);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.CHAVE_AUTH);
  }

  clienteAtual(): any {
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || 'null');
  }
}
