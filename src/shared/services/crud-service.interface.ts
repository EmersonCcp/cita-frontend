import { Observable } from 'rxjs';

export interface ICrudService<T> {
  create(item: T): Observable<{ ok: boolean, item: T, message?: string }>;
  getAll(): Observable<{ ok: boolean, items: T[], message?: string }>;
  getById(id: number): Observable<{ ok: boolean, item: T, message?: string }>;
  update(id: number, item: T): Observable<{ ok: boolean, item: T, message?: string }>;
  delete(id: number): Observable<{ ok: boolean, message?: string }>;
}