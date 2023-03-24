import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  titulo: string = 'Dashboard';

  constructor(private route: Router) { }

  navegar(destino: string) {
    switch(destino) {
      case 'pedidos':
        this.route.navigate(['/pedido']);
        this.titulo = 'Pedidos';
        break;
      case 'entregas':
        this.route.navigate(['/entrega']);
        this.titulo = 'Entregas';
        break;
      case 'clientes':
        this.route.navigate(['/cliente']);
        this.titulo = 'Clientes';
        break;
      case 'produtos':
        this.route.navigate(['/produto']);
        this.titulo = 'Produtos';
        break;
      default:
        this.route.navigate(['']);
      
    }
  }
}
