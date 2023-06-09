import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  URI = 'http://localhost:3333/produto';

  constructor(private http: HttpClient) {  }

  getProdutos() {
    return this.http.get(this.URI);
  }

  getProdutoPorId(idProduto: any) {
    return this.http.get(`${this.URI}/${idProduto}`);
  }

  postProduto(obj: Produto) {
    return this.http.post(this.URI, obj);
  }

  putProduto(idProduto: any, obj: Produto) {
    return this.http.put(`${this.URI}/${idProduto}`, obj);
  }

  deleteProduto(idProduto: string) {
    return this.http.delete(`${this.URI}/${idProduto}`);
  }

  
}
