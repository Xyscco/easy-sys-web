import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { Endereco } from './../../../models/endereco.model';

@Component({
  selector: 'app-modal-endereco',
  templateUrl: './modal-endereco.component.html',
  styleUrls: ['./modal-endereco.component.scss']
})
export class ModalEnderecoComponent implements OnInit{
  
  logradouroFormControl = new FormControl('', [
    Validators.required
  ])

  endereco = new Endereco();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalEnderecoComponent>) {

  }
  
  ngOnInit(): void {
    if (this.data)
      this.endereco = this.data;
  }

  onClose() {
    this.dialogRef.close(this.endereco);
  }

}
