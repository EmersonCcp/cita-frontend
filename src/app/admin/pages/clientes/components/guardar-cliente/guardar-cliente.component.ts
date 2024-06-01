import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-guardar-cliente',
  templateUrl: './guardar-cliente.component.html',
  styleUrls: ['./guardar-cliente.component.scss']
})
export class GuardarClienteComponent implements OnInit {

  selectedOption: string = 'default';
  id = 0;
  form: FormGroup;
  title = "Nuevo Cliente";
  subtitle = "Datos del nuevo cliente";

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ){
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      apellido: [""],
      telefono: [""],
      sexo: ["default"],
      fecha_nacimiento: [""],
      email: [""],
      direccion: [""]
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if(this.id !== 0) {
        this.title = "Editar Cliente";
        this.subtitle = "Datos del cliente"
        this.clienteService.getById(this.id).subscribe((res) => {
          this.form.patchValue(res.item);
        });
      }
    });
  }

  ngSubmit() {
    if(this.form.valid) {

      if(this.id !== 0) {
        this.clienteService.update(this.id,this.form.value).subscribe((res) => {
          if(res.ok) {
            this.alertService.successOrError('Éxito!','Registro guardado correctamente!','success');
            this.router.navigate(["/admin/clientes"]);
          }
        });
      } else {
        this.clienteService.create(this.form.value).subscribe((res) => {
          if(res.ok) {
            this.alertService.successOrError('Éxito!','Registro guardado correctamente!','success');
            this.router.navigate(["/admin/clientes"]);
          }
        });
      }

    }
  }

}
