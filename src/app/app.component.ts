import { Component } from '@angular/core';
import { NotificacaoService } from '../app/services/notificacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  mensagem$ = this.notificacaoService.mensagem$;

  constructor(private notificacaoService: NotificacaoService) {}
}
