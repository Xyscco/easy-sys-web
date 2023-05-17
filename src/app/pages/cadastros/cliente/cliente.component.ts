import { Router } from '@angular/router';
import { AfterViewInit,  Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppComponent } from './../../../app.component';
import { ClienteService } from './../../../api/cliente/cliente.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../modals/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator: any;

  displayedColumns: string[] = [ 'cpfCnpj', 'nomeRazao', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  length = 0;

  dialogConfig = new MatDialogConfig();

  constructor(
    private app: AppComponent, 
    public modal: MatDialog, 
    private paginatorIntl: MatPaginatorIntl, 
    private apiCliente: ClienteService,
    private router: Router) {

    this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    this.paginatorIntl.nextPageLabel = 'Próxima página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.firstPageLabel = 'Primeira página';
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);

  }

  getRangeLabel(page: number, pageSize: number, length: number) {
    const startIndex = page * pageSize + 1;
    const endIndex = (page + 1) * pageSize;
    return `Página ${startIndex} a ${endIndex} de ${length}`;
  }

  ngAfterViewInit() {
    this.carregaClientes();
  }

  carregaClientes() {
    this.apiCliente.getClientes()
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.dataSource = new MatTableDataSource<any>(_dados);
      this.dataSource.paginator = this.paginator;
      this.length = this.dataSource.data.length;
    });

  }

  cadastrarNovoCliente() {
    this.router.navigate(['/cliente/crud']);
  }

  abrirCadastroCliente(id: string) {
    this.router.navigate([`/cliente/crud/${id}`]);
  }

  confirmaExclusaoCliente(id: string) {
    this.dialogConfig.width = '800px';
      this.dialogConfig.data = id;
    const dialogRef = this.modal.open(ModalConfirmacaoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null)
        this.excluirCliente(result);
    });
  }

  excluirCliente(id: string){
    console.log(id);
    this.apiCliente.deleteCliente(id)
      .pipe(
        catchError((error) => {
          return throwError(() => this.app.openSnackBar(error.status));
        })
      )
      .subscribe((_dados: any) => {
        this.app.openSnackBar(200);
        this.carregaClientes();
      });
  }

}

