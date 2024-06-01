import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { Cliente } from '../../../clientes/models/cliente.model';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ServicioService } from '../../../servicios/services/servicio.service';
import { Servicio } from '../../../servicios/models/servicio.model';
import { CitaServicio } from '../../models/cita_servicio.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CitaServicioService } from '../../services/cita-servicio.service';

@Component({
  selector: 'app-guardar-cita',
  templateUrl: './guardar-cita.component.html',
  styleUrls: ['./guardar-cita.component.scss'],
})
export class GuardarCitaComponent {
  id = 0;
  form: FormGroup;
  formServicio: FormGroup;
  title = 'Nueva Cita';
  subtitle = 'Datos de la nueva cita';
  isViewMode = false;
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  displayedColumns: string[] = ['servicio', 'monto', 'accion'];
  dataSource!: MatTableDataSource<CitaServicio>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  citasServicios: CitaServicio[] = [];
  citasServiciosRemove: CitaServicio[] = [];

  estadoDefault = 'pendiente';

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private clienteService: ClienteService,
    private serviciosService: ServicioService,
    private citasServicioService: CitaServicioService
  ) {
    this.dataSource = new MatTableDataSource<CitaServicio>(this.citasServicios);

    this.form = this.fb.group({
      clienteId: [0, Validators.required],
      fecha: ['', Validators.required],
      hora: ['08:00 AM', Validators.required],
      estado: ['pendiente', Validators.required],
    });

    this.formServicio = this.fb.group({
      servicioId: [, Validators.required],
      monto: [],
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.citasServicios;
    this.dataSource.paginator = this.paginator;

    this.clienteService.getAll().subscribe((res) => {
      const { ok, items } = res;
      if (res.ok) {
        this.clientes = items;
      }
    });

    this.serviciosService.getAll().subscribe((res) => {
      const { ok, items } = res;
      if (res.ok) {
        this.servicios = items;
      }
    });

    this.route.paramMap.subscribe((params) => {
      const mode = params.get('mode');
      this.id = Number(params.get('id'));
      this.isViewMode = mode === 'view';

      if (this.id !== 0) {
        this.title = 'Editar Cita';
        this.subtitle = 'Datos la cita';
        this.citasService.getById(this.id).subscribe((res) => {
          this.form.patchValue(res.item);
        });

        this.citasServicioService.getAllById(this.id).subscribe((res) => {
          console.log('citas servicios:', res);
          const { ok, items } = res;
          if (ok) {
            this.citasServicios = items;
            this.dataSource.data = this.citasServicios;
          }
        });
      }

      if (this.isViewMode) {
        this.title = 'Cita';
        this.form.disable();
        // this.formServicio.disable();
        this.displayedColumns = ['servicio', 'monto'];
      }
    });
  }

  ngSubmit() {
    if (this.form.valid && this.citasServicios.length > 0) {
      this.alertService.loader();

      let monto = 0;

      this.citasServicios.map((citaServicio) => {
        monto = monto + citaServicio.monto;
      });

      this.form.value.monto = monto;

      if (this.id !== 0) {
        console.log('longitud:', this.citasServiciosRemove.length);

        if (this.citasServiciosRemove.length > 0) {
          this.citasServiciosRemove.map((citaServicio) => {
            if (citaServicio.id) {
              this.citasServicioService
                .delete(citaServicio.id)
                .subscribe((res) => {
                  console.log('eliminado con exito', res);
                });
            }
          });
        }

        this.citasService.update(this.id, this.form.value).subscribe((res) => {
          if (res.ok) {
            this.citasServicios.map((citaServicio) => {
              if (!citaServicio.id) {
                citaServicio.citaId = this.id;
                this.citasServicioService
                  .create(citaServicio)
                  .subscribe((res) => {
                    if (res.ok) {
                      console.log('serivioc creado:', res);
                    }
                  });
              }
            });
            this.alertService.successOrError(
              'Éxito!',
              'Registro guardado correctamente!',
              'success'
            );
            this.router.navigate(['/admin/citas']);
          }
        });
      } else {
        this.createCita();
      }
    }
  }

  createCita() {
    let monto = 0;
    this.citasServicios.map((citaServicio) => {
      monto = monto + citaServicio.monto;
    });

    this.form.value.monto = monto;

    this.citasService.create(this.form.value).subscribe((res) => {
      const { ok, item } = res;

      if (ok) {
        this.citasServicios.map((cita) => {
          let citaServicio: CitaServicio = {
            citaId: item.id,
            servicioId: cita.servicioId,
            monto: cita.monto,
          };

          this.citasServicioService.create(citaServicio).subscribe((res) => {
            console.log(res);
          });
        });

        this.alertService.successOrError(
          'Éxito!',
          'Registro guardado correctamente!',
          'success'
        );
        this.router.navigate(['/admin/citas']);
      } else {
        this.alertService.successOrError('Ups!', 'Ocurrió un error', 'error');
      }
    });
  }

  onServicioChange(event: any) {
    const selectedServicio = this.servicios.find(
      (servicio) => servicio.id === event.value
    );
    if (selectedServicio) {
      this.formServicio.controls['monto'].setValue(selectedServicio.precio);
    }
  }

  addServicio() {
    if (this.formServicio.valid) {
      const selectedServicio = this.servicios.find(
        (servicio) => servicio.id === this.formServicio.value.servicioId
      );
      if (selectedServicio) {
        let obj: CitaServicio = {
          servicioId: selectedServicio.id,
          servicio: selectedServicio.servicio,
          monto: this.formServicio.value.monto,
        };
        this.citasServicios.push(obj);
        this.dataSource.data = this.citasServicios;

        this.formServicio.reset();
        console.log(this.citasServicios);
      }
    }
  }

  deleteServicio(index: any) {
    this.citasServiciosRemove.push(this.citasServicios[index]);
    console.log(
      'citasServicios removidos: ',
      this.citasServiciosRemove,
      this.citasServicios[index],
      index
    );
    this.citasServicios.splice(index, 1);

    this.dataSource.data = this.citasServicios;
  }
}
