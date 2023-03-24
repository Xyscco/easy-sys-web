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
}
