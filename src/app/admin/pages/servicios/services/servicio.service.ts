import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio.model';
import { ICrudService } from 'src/shared/services/crud-service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService implements ICrudService<Servicio> {

  private apiUrl = 'http://localhost:3000/v1/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  create(item: Servicio): Observable<{ok: boolean, item:Servicio, message?: string}> {
    return this.http.post<{ok: boolean, item:Servicio, message?: string}>(`${this.apiUrl}/servicio`, item);
  }

  getAll(): Observable<{ok: boolean, items:Servicio[], message?: string}> {
    return this.http.get<{ok: boolean, items:Servicio[], message?: string}>(`${this.apiUrl}/servicios`);
  }

  getById(id: number): Observable<{ok: boolean, item:Servicio, message?: string}> {
    return this.http.get<{ok: boolean, item:Servicio, message?: string}>(`${this.apiUrl}/servicio/${id}`);
  }

  update(id: number, item: Servicio): Observable<{ok: boolean, item:Servicio, message?: string}> {
    return this.http.put<{ok: boolean, item:Servicio, message?: string}>(`${this.apiUrl}/servicio/${id}`, item);
  }

  delete(id: number): Observable<{ok: boolean, message?: string}> {
    return this.http.delete<{ok: boolean, message?: string}>(`${this.apiUrl}/servicio/${id}`);
  }
}
