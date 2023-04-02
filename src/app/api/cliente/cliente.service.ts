import { Telefone } from './../../models/telefone.model';
import { Endereco } from 'src/app/models/endereco.model';
import { Cliente } from 'src/app/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URI = 'http://localhost:3333/cliente';

  constructor(private http: HttpClient) {  }

  getClientes() {
    return this.http.get(this.URI);
  }

  getClientePorId(idCliente: any) {
    return this.http.get(`${this.URI}/${idCliente}`);
  }

  postCliente(obj: Cliente) {
    return this.http.post(this.URI, obj);
  }

  putCliente(idCliente: any, obj: Cliente) {
    return this.http.put(`${this.URI}/${idCliente}`, obj);
  }

  deleteCliente(idCliente: string) {
    return this.http.delete(`${this.URI}/${idCliente}`);
  }

  postEndereco(obj: Endereco) {
    return this.http.post(`${this.URI}/endereco`, obj);
  }

  putEndereco(obj: Endereco) {
    return this.http.put(`${this.URI}/endereco/${obj.id}`, obj);
  }

  deleteEndereco(idEndereco: string) {
    return this.http.delete(`${this.URI}/endereco/${idEndereco}`);
  }

  postTelefone(obj: Telefone) {
    return this.http.post(`${this.URI}/telefone`, obj);
  }

  putTelefone(obj: Telefone) {
    return this.http.put(`${this.URI}/telefone/${obj.id}`, obj);
  }

  deleteTelefone(idTelefone: string) {
    return this.http.delete(`${this.URI}/telefone/${idTelefone}`);
  }
}
