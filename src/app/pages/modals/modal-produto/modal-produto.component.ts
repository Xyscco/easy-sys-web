import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent {

  produto: Produto = new Produto();

  descricao = new FormControl('', [
    Validators.required
  ])

  valor = new FormControl('', [
    Validators.required
  ])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalProdutoComponent>) {

  }
  
  ngOnInit(): void {
    if (this.data)
      this.produto = this.data;
  }

  onClose() {
    this.dialogRef.close(this.produto);
  }

  // getMask() {
  //   if (this.telefone.tipo === '1' )
  //     return '(00) 0000-0000';
  //   else
  //     return '(00) 0 0000-0000';
  // }

}
