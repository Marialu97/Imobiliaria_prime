import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  perfil = {
    nome: '.',
    email: '.',
    telefone: '.',
    cidade: '.',
    interesses: '.',
    avatar: '', // <- adicione esta linha
  };

  ngOnInit() {
    // Carrega perfil do LocalStorage se existir
    const savedPerfil = localStorage.getItem('perfil');
    if (savedPerfil) {
      this.perfil = JSON.parse(savedPerfil);
    }
  }

  salvarPerfil() {
    localStorage.setItem('perfil', JSON.stringify(this.perfil));
    alert('Perfil salvo com sucesso!');
  }

  alterarAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.perfil.avatar = reader.result as string;
        localStorage.setItem('perfil', JSON.stringify(this.perfil));
      };
      reader.readAsDataURL(file);
    }
  }
}

