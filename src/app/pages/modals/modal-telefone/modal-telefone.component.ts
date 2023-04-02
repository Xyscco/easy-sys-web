import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { Telefone } from '../../../models/telefone.model';

@Component({
  selector: 'modal-telefone',
  templateUrl: './modal-telefone.component.html',
  styleUrls: ['./modal-telefone.component.scss']
})
export class ModalTelefoneComponent implements OnInit{
  
  enderecoFormControl = new FormControl('', [
    Validators.required
  ]);

  tiposTelefone: any = [
    {
      codigo: '1',
      descricao: 'Fixo'
    },
    {
      codigo: '2',
      descricao: 'Celular'
    },
    {
      codigo: '3',
      descricao: 'Whatsapp'
    },
    {
      codigo: '4',
      descricao: 'Trabalho'
    },
  ]

  telefone = new Telefone();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalTelefoneComponent>) {

  }
  
  ngOnInit(): void {
    if (this.data)
      this.telefone = this.data;
  }

  onClose() {
    this.dialogRef.close(this.telefone);
  }

  getMask() {
    if (this.telefone.tipo === '1' )
      return '(00) 0000-0000';
    else
      return '(00) 0 0000-0000';
  }

}
