import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  // Subir un archivo
  uploadFile(filePath: string, file: File): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable<string>((observer) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              observer.next(url);
              observer.complete();
            });
          })
        )
        .subscribe();
    });
  }

  // Descargar un archivo
  downloadFile(filePath: string): Observable<any> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getMetadata();
  }

  // Eliminar un archivo
  deleteFile(filePath: string): Observable<any> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.delete();
  }
}
