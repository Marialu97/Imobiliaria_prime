import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// COMPONENTE CABEÇALHO
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  esconderHome: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarHeader(this.router.url); // inicial
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        const navEnd = event as NavigationEnd;
        this.atualizarHeader(navEnd.urlAfterRedirects);
      });
  }

  atualizarHeader(url: string) {
    this.esconderHome = url.startsWith('/interna');
  }
}
