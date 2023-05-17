import { AppComponent } from './../../../../app.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClienteService } from './../../../../api/cliente/cliente.service';
import { Telefone } from './../../../../models/telefone.model';
import { ModalTelefoneComponent } from './../../../modals/modal-telefone/modal-telefone.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/endereco.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalEnderecoComponent } from './../../../modals/modal-endereco/modal-endereco.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.scss']
})
export class CrudClienteComponent implements OnInit {

  titulo: string = 'Novo Cliente';

  cliente: Cliente = new Cliente();
  expandedPanel: number = 0;

  isEdicao: boolean = false;

  emailFormControl = new FormControl('', [
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  ]);

  nomeRazaoFormControl = new FormControl('', [
    Validators.required
  ])

  dialogConfig = new MatDialogConfig();

  constructor(
    public app: AppComponent, 
    public modal: MatDialog, 
    public apiCliente: ClienteService, 
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.cliente.id = params['id'];
      }
    });
  }

  ngOnInit() {
    if (this.cliente.id !== null && this.cliente.id !== undefined && this.isEdicao) {
      this.carregaClienteEdicao(); 
    }
  }

  carregaClienteEdicao() {
    this.apiCliente.getClientePorId(this.cliente.id)
      .pipe(
        catchError((error) => {
          return throwError(() => this.app.openSnackBar(error.status));
        })
      )
      .subscribe((_dados: any) => {
        this.cliente = _dados;
      });  
  }

  salvarCliente() {
    if (this.cliente.id === null) {
      this.incluir();
    } else {
      this.alterar();
    }
  }

  incluir() {
    this.apiCliente.postCliente(this.cliente)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.app.openSnackBar(200);
      this.router.navigate(['cliente']);
    });

  }

  alterar() {
    this.apiCliente.putCliente(this.cliente.id, this.cliente)
      .pipe(
        catchError((error) => {
          return throwError(() => this.app.openSnackBar(error.status));
        })
      )
      .subscribe((_dados: any) => {
        this.app.openSnackBar(200);
        this.router.navigate(['cliente']);
      });
  }

  removerCliente() {
    if (this.cliente.id)
      this.apiCliente.deleteCliente(this.cliente.id)
        .pipe(
          catchError((error) => {
            return throwError(() => this.app.openSnackBar(error.status));
          })
        )
        .subscribe((_dados: any) => {
          this.app.openSnackBar(200);
          this.router.navigate(['cliente']);
        });

  }

  cancelar() {
    this.router.navigate(['cliente']);
  }

  // INFORMAÇÕES ADICIONAIS

  openPanel(index: number) {
    this.expandedPanel = index;
  }

  //ENDEREÇO

  openModalEndereco(endereco?: Endereco | null) {
    this.dialogConfig.width = '800px';
    if (endereco === null)
      this.dialogConfig.data = new Endereco();
    else
      this.dialogConfig.data = endereco;

    const dialogRef = this.modal.open(ModalEnderecoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (!this.isEdicao)
        this.cliente.enderecos?.push(result);
      else if (result.id !== null && result.id !== undefined) 
        this.alteraEndereco(result);
      else
        this.incluirEndereco(result);
    });
  }

  incluirEndereco(objEndereco: Endereco) {
    objEndereco.clienteId = this.cliente.id;
    objEndereco
    this.apiCliente.postEndereco(objEndereco)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.enderecos?.push(objEndereco);
    });
  }

  alteraEndereco(objEndereco: Endereco) {
    this.apiCliente.putEndereco(objEndereco)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.enderecos?.forEach((item, _index) => {
        if (objEndereco.id = item.id) 
          item = objEndereco;
      });
    });
  }

  removeEndereco(index: number, endereco: Endereco) {
    if (endereco.id === null)
      this.cliente.enderecos = this.cliente.enderecos?.filter((item, _index) => index !== _index);
    else 
      this.deleteEndereco(endereco.id, index);
  }

  deleteEndereco(idEndereco: any, index: number) {
    this.apiCliente.deleteEndereco(idEndereco)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.enderecos = this.cliente.enderecos?.filter((item, _index) => index !== _index);
    });
  }

  getTextoEndereco(item: Endereco) {
    let text = `${item.logradouro}`

    if (item.numero)
      text += `, n° ${item.numero}`
    
    if (item.complemento)
      text += `, ${item.complemento}`
    
    if (item.bairro)
      text += `, ${item.bairro}`
    
    if (item.cidade)
      text += `, ${item.cidade}`
    
    if (item.estado)
      text += `, ${item.estado}`
    
    if (item.cep)
      text += `, ${item.cep}`

    return text
  }

  // TELEFONE

  openModalTelefone(telefone?: Telefone | null) {
    this.dialogConfig.width = '500px';
    if (telefone === null)
      this.dialogConfig.data = new Telefone();
    else
      this.dialogConfig.data = telefone;

    const dialogRef = this.modal.open(ModalTelefoneComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(index);
      if (!this.isEdicao)
        this.cliente.telefones?.push(result);
      
      console.table(this.cliente.telefones);

      if (!this.isEdicao)
        this.cliente.telefones?.push(result);
      else if (result.id !== null && result.id !== undefined) 
        this.alterarTelefone(result);
      else
        this.incluirTelefone(result);
    });
  }

  incluirTelefone(objTelefone: Telefone) {
    objTelefone.clienteId = this.cliente.id;
    this.apiCliente.postTelefone(objTelefone)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.telefones?.push(objTelefone);
    });
  }

  alterarTelefone(objTelefone: Telefone) {
    this.apiCliente.putTelefone(objTelefone)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.telefones?.forEach((item, _index) => {
        if (objTelefone.id = item.id) 
          item = objTelefone;
      });
    });
  }

  removeTelefone(index: number, telefone: Telefone) {
    if (telefone.id === null)
      this.cliente.telefones = this.cliente.telefones?.filter((item, _index) => index !== _index);
    else 
      this.deleteTelefone(telefone.id, index);
  }

  deleteTelefone(idTelefone: any, index: number) {
    this.apiCliente.deleteTelefone(idTelefone)
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.cliente.telefones = this.cliente.telefones?.filter((item, _index) => index !== _index);
    });
  }

  getTextoTelefone(item: Telefone) {
    let text = ''

    if (item.tipo === '1')
      text += `Fixo - ${item.numero}`
    
    if (item.tipo === '2')
      text += `Celular - ${item.numero}`
    
    if (item.tipo === '3')
      text += `Whatsapp - ${item.numero}`
    
    if (item.tipo === '4')
      text += `Trabalho - ${item.numero}`

    return text
  }


}
