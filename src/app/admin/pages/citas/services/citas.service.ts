import { Injectable } from '@angular/core';
import { ICrudService } from 'src/shared/services/crud-service.interface';
import { Cita } from '../models/cita.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService implements ICrudService<Cita> {

  private apiUrl = 'http://localhost:3000/v1/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  create(item: Cita): Observable<{ok:boolean, item:Cita,  message?: string }> {
    return this.http.post<{ok:boolean, item:Cita,  message?: string }>(`${this.apiUrl}/cita`, item);
  }

  getAll(): Observable<{ ok: boolean, items: Cita[], message?: string }> {
    return this.http.get<{ok:boolean, items:Cita[], message?: string}>(`${this.apiUrl}/citas`);
  }

  getById(id: number): Observable<{ ok: boolean, item: Cita, message?: string }> {
    return this.http.get<{ ok: boolean, item: Cita, message?: string }>(`${this.apiUrl}/cita/${id}`);
  }

  update(id: number, item: Cita): Observable<{ ok: boolean, item: Cita, message?: string }> {
    return this.http.put<{ ok: boolean, item: Cita, message?: string }>(`${this.apiUrl}/cita/${id}`, item);
  }

  updateEstado(id: number, estado: string): Observable<{ ok: boolean, message?: string }> {
    return this.http.put<{ ok: boolean, message?: string }>(`${this.apiUrl}/cita-estado/${id}/${estado}`, {});
  }

  delete(id: number): Observable<{ ok: boolean, message?: string }> {
    return this.http.delete<{ ok: boolean, message?: string }>(`${this.apiUrl}/cita/${id}`);
  }
  
}
