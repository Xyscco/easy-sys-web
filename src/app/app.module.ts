import { ModalTelefoneComponent } from './pages/modals/modal-telefone/modal-telefone.component';
import { ProdutoComponent } from './pages/cadastros/produto/produto.component';
import { ClienteComponent } from './pages/cadastros/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { CrudClienteComponent } from './pages/cadastros/cliente/crud-cliente/crud-cliente.component';
import { ModalEnderecoComponent } from './pages/modals/modal-endereco/modal-endereco.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClienteComponent,
    ProdutoComponent,
    LayoutComponent,
    CpfCnpjPipe,
    CrudClienteComponent,
    ModalEnderecoComponent,
    ModalTelefoneComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
