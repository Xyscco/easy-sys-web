import { CrudClienteComponent } from './pages/cadastros/cliente/crud-cliente/crud-cliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdutoComponent } from './pages/cadastros/produto/produto.component';
import { ClienteComponent } from './pages/cadastros/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'pedido', component: DashboardComponent},
  { path: 'entrega', component: DashboardComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'cliente/crud', component: CrudClienteComponent},
  { path: 'cliente/crud/:id', component: CrudClienteComponent},
  { path: 'produto', component: ProdutoComponent},
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
