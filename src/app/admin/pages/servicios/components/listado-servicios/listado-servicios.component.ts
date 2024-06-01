import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServicioService } from '../../services/servicio.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/shared/services/storage.service';
import { environment } from 'src/environments/environment.development';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-listado-servicios',
  templateUrl: './listado-servicios.component.html',
  styleUrls: ['./listado-servicios.component.scss']
})
export class ListadoServiciosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'servicio','precio', 'img','accion'];
  servicios: Servicio[] = []
  dataSource: MatTableDataSource<Servicio>;;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlImage = environment.supabase.urlStorage;

  constructor(
    private servicioService: ServicioService,
    private storageService: StorageService,
    private alertService: AlertService
  ){
    this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
  }

  ngOnInit(): void {
    this.servicioService.getAll().subscribe((res) => {
      this.servicios = res.items;
      this.dataSource.data = this.servicios;
      this.dataSource.paginator = this.paginator;
    });
}

deleteServicio(servicio: Servicio) {
  Swal.fire({
    title: 'Estás seguro?',
    text: 'El registro no podrá recuperarse!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si!',
    cancelButtonText: 'No'
  }).then((result) => {
    
    if (result.value) {

      if(servicio.img) {
        this.storageService.delete('servicios', `user1/${servicio.img}`).then((res) => {
        });
      }

      this.servicioService.delete(servicio.id).subscribe((res) => {
        if(res.ok) {
          this.servicios = this.servicios.filter(c => c.id !== servicio.id);
          this.dataSource.data = this.servicios;
          this.alertService.successOrError('Registro eliminado!','','success');
        } else {
          this.alertService.successOrError('Error!','El dato puede estar en uso','error');
        }
      });
    } 
  })
}

}
