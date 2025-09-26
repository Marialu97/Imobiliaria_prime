import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private _mensagem = new BehaviorSubject<string | null>(null);
  public mensagem$ = this._mensagem.asObservable();

  constructor() {}

  mostrar(mensagem: string, duracao: number = 3000) {
    this._mensagem.next(mensagem);
    setTimeout(() => this._mensagem.next(null), duracao);
  }

  limpar() {
    this._mensagem.next(null);
  }
}
