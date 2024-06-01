import { Injectable } from '@angular/core';
import { ICrudService } from 'src/shared/services/crud-service.interface';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements ICrudService<Cliente> {

  private apiUrl = 'http://localhost:3000/v1/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  create(item: Cliente): Observable<{ok:boolean,item:Cliente, message?: string}> {
    return this.http.post<{ok:boolean,item:Cliente, message?: string}>(`${this.apiUrl}/cliente`, item);
  }

  getAll(): Observable<{ok:boolean,items:Cliente[], message?: string}> {
    return this.http.get<{ok:boolean,items:Cliente[], message?: string}>(`${this.apiUrl}/clientes`);
  }

  getById(id: number): Observable<{ok:boolean,item:Cliente, message?: string}> {
    return this.http.get<{ok:boolean,item:Cliente, message?: string}>(`${this.apiUrl}/cliente/${id}`);
  }

  update(id: number, item: Cliente): Observable<{ok:boolean,item:Cliente, message?: string}> {
    return this.http.put<{ok:boolean,item:Cliente, message?: string}>(`${this.apiUrl}/cliente/${id}`, item);
  }

  delete(id: number): Observable<{ok:boolean, message?: string}> {
    return this.http.delete<{ok:boolean, message?: string}>(`${this.apiUrl}/cliente/${id}`);
  }


}
