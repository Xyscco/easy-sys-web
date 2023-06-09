import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppComponent } from './../../../app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/api/produto/produto.service';
import { Produto } from 'src/app/models/produto.model';
import { ModalProdutoComponent } from '../../modals/modal-produto/modal-produto.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

  @ViewChild (MatPaginator) paginator: any;

  displayedColumns: string[] = [ 'descricao', 'valor', 'estoque', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  lengthList = 0;

  dialogConfig = new MatDialogConfig();

  constructor(
    private app: AppComponent, 
    public modal: MatDialog, 
    private paginatorIntl: MatPaginatorIntl, 
    private apiProduto: ProdutoService,
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
    this.carregaProduto();
  }

  carregaProduto() {
    this.apiProduto.getProdutos()
    .pipe(
      catchError((error) => {
        return throwError(() => this.app.openSnackBar(error.status));
      })
    )
    .subscribe((_dados: any) => {
      this.dataSource = new MatTableDataSource<any>(_dados);
      this.dataSource.paginator = this.paginator;
      this.lengthList = this.dataSource.data.length;
    });

  }

  cadastrarProduto() {
    this.openModalProduto(null);
  }

  editarProduto(idProduto: string) {

  }

  confirmaExclusaoProduto(idProduto: string) {

  }

  openModalProduto(produto?: Produto | null) {
    this.dialogConfig.width = '500px';
    if (produto === null)
      this.dialogConfig.data = new Produto();
    else
      this.dialogConfig.data = produto;

    const dialogRef = this.modal.open(ModalProdutoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(index);
      // if (!this.isEdicao)
      //   this.cliente.telefones?.push(result);
      
      // console.table(this.cliente.telefones);

      // if (!this.isEdicao)
      //   this.cliente.telefones?.push(result);
      // else if (result.id !== null && result.id !== undefined) 
      //   this.alterarTelefone(result);
      // else
      //   this.incluirTelefone(result);
    });
  }
}
