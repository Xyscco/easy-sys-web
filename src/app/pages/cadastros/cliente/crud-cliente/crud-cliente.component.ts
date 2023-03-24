import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/endereco.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ModalEnderecoComponent } from './../../../modals/modal-endereco/modal-endereco.component';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.scss']
})
export class CrudClienteComponent {

  cliente: Cliente = new Cliente();
  expandedPanel: number = 0;

  emailFormControl = new FormControl('', [
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  ]);

  nomeRazaoFormControl = new FormControl('', [
    Validators.required
  ])

  dialogConfig = new MatDialogConfig();

  constructor(public modalEndereco: MatDialog) {
    this.cliente.enderecos = [{
      logradouro: "Rua RL 01",
      numero: null,
      complemento: "qd 5a lt 8",
      bairro: "Limoeiro",
      cidade: "Goianira",
      estado: "Goiás",
      cep: "75368-191",
    },
    {
      logradouro: "Rua RL 01",
      numero: null,
      complemento: "qd 5a lt 8",
      bairro: "Limoeiro",
      cidade: "Goianira",
      estado: "Goiás",
      cep: "75368-191",
    }]
  }

  openPanel(index: number) {
    this.expandedPanel = index;
  }

  openModalEndereco(isInclusao: boolean = true, endereco?: Endereco) {
    this.dialogConfig.width = '800px';
    if (isInclusao)
      this.dialogConfig.data = new Endereco();
    else
      this.dialogConfig.data = endereco;
    const dialogRef = this.modalEndereco.open(ModalEnderecoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(index);
      if (isInclusao)
        this.cliente.enderecos?.push(result);
      
      console.table(this.cliente.enderecos);
    });
  }

  deleteEndereco(index: number, endereco: Endereco) {
    console.log("Remover endereço");
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


}
