import { Injectable } from '@angular/core';
import { CitaServicio } from '../models/cita_servicio.model';
import { ICrudService } from 'src/shared/services/crud-service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaServicioService implements ICrudService<CitaServicio> {

  private apiUrl = 'http://localhost:3000/v1/api'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  getAllById(id: number): Observable<{ok:boolean, items:CitaServicio[], message?: string}> {
    return this.http.get<{ok:boolean, items:CitaServicio[], message?: string}>(`${this.apiUrl}/citas_servicios/${id}`);
  }
  
  getAll(): Observable<{ok:boolean, items:CitaServicio[], message?: string}> {
    return this.http.get<{ok:boolean, items:CitaServicio[], message?: string}>(`${this.apiUrl}/citas_servicios`);
  }

  create(item: CitaServicio): Observable<{ok:boolean, item:CitaServicio, message?: string}> {
    return this.http.post<{ok:boolean, item:CitaServicio, message?: string}>(`${this.apiUrl}/cita_servicio`, item);
  }


  getById(id: number): Observable<{ok:boolean, item:CitaServicio, message?: string}> {
    return this.http.get<{ok:boolean, item:CitaServicio, message?: string}>(`${this.apiUrl}/cita_servicio/${id}`);
  }

  update(id: number, item: CitaServicio): Observable<{ok:boolean, item:CitaServicio, message?: string}> {
    return this.http.put<{ok:boolean, item:CitaServicio, message?: string}>(`${this.apiUrl}/cita_servicio/${id}`, item);
  }

  deleteByCitaId(id: number): Observable<{ok:boolean, message?: string}> {
    return this.http.delete<{ok:boolean, message?: string}>(`${this.apiUrl}/cita_servicios/${id}`);
  }

  delete(id: number): Observable<{ok:boolean, message?: string}> {
    return this.http.delete<{ok:boolean, message?: string}>(`${this.apiUrl}/cita_servicio/${id}`);
  }
}
