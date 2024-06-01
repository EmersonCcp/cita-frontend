import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../models/cita.model';
import { CitasService } from '../../services/citas.service';
import Swal from 'sweetalert2';
import { CitaServicioService } from '../../services/cita-servicio.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss'],
})
export class ListadoCitasComponent {
  displayedColumns: string[] = [
    'id',
    'nombrecompleto',
    'fecha',
    'hora',
    'monto',
    'estado',
    'changeEstado',
    'accion',
  ];
  citas: Cita[] = [];
  dataSource: MatTableDataSource<Cita>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private citasService: CitasService,
    private citasServiciosService: CitaServicioService,
    private alertService: AlertService
  ) {
    this.dataSource = new MatTableDataSource<Cita>(this.citas);
  }

  ngOnInit(): void {
    this.citasService.getAll().subscribe((res) => {
      if (res.ok) {
        this.citas = res.items;
        this.dataSource.data = this.citas;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'El registro no podrá recuperarse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.alertService.loader();

        this.citasServiciosService.deleteByCitaId(id).subscribe((res) => {
          if (res.ok) {
            this.citasService.delete(id).subscribe((res) => {
              if (res.ok) {
                this.citas = this.citas.filter((c) => c.id !== id);
                this.dataSource.data = this.citas;
                this.alertService.successOrError(
                  'Registro eliminado!',
                  '',
                  'success'
                );
              }
            });
          }
        });
      }
    });
  }

  changeEstado(id: any, estado: string) {
    let textColor =
      estado === 'Cancelado'
        ? 'text-red-500'
        : estado === 'Completado'
        ? 'text-green-500'
        : 'text-primary';
    let index = this.citas.findIndex((cita) => cita.id == id);

    this.citasService.updateEstado(id, estado).subscribe((res) => {
      if (res.ok) {
        this.citas[index].estado = estado.toLowerCase();
        this.dataSource.data = this.citas;
        this.alertService.successOrError(
          'Exito',
          `Estado cambiado a <span class="${textColor} font-medium">${estado}<span/>`,
          'success'
        );
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'cancelado':
        return 'bg-red-500 text-white p-1 rounded-md'; // Tailwind CSS classes for 'cancelado'
      case 'completado':
        return 'bg-green-500 text-white p-1 rounded-md'; // Tailwind CSS classes for 'completado'
      case 'pendiente':
        return 'bg-primary text-white p-1 rounded-md'; // Tailwind CSS classes for 'pendiente'
      default:
        return '';
    }
  }
}
