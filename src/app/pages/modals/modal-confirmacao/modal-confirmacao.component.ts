import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';

@Component({
  selector: 'modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit{
  
  logradouroFormControl = new FormControl('', [
    Validators.required
  ])

  objRetorno: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalConfirmacaoComponent>) {

  }
  
  ngOnInit(): void {
    if (this.data)
      this.objRetorno = this.data;
  }

  onClose() {
    this.dialogRef.close(this.objRetorno);
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
