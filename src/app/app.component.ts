import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(status: number = 0, time: number = 3) {
    let msg = 'Falha na requisição';

    if (status === 400)
      msg = 'Erro na realização da consulta no servidor';
    else if (status === 502)
      msg = 'Servidor off-line';
    else if (status === 200)
      msg = "Sucesso na requisição";
    else if (status === 0)
      msg = "Servidor não encontrado";
    else
      msg = "Algo de errado não está certo";

    this._snackBar.open(msg, 'fechar', {
      duration: time * 1000,
    });
  }
}

