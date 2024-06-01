import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from 'src/shared/services/storage.service';
import {v4 as uuid} from 'uuid';
import { environment } from 'src/environments/environment.development';
import { AlertService } from 'src/app/alert.service';


@Component({
  selector: 'app-guardar-servicio',
  templateUrl: './guardar-servicio.component.html',
  styleUrls: ['./guardar-servicio.component.scss']
})
export class GuardarServicioComponent {

  id = 0;
  form: FormGroup;
  title = "Nuevo Servicio";
  subtitle = "Datos del nuevo servicio";
  img:any = "http://placehold.it/180";
  imgPath = '';
  file:any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private alertService: AlertService
  ){
    this.form = this.fb.group({
      servicio: ["", Validators.required],
      descripcion: [""],
      precio: [0],
      // img: [""],
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if(this.id !== 0) {
        this.title = "Editar Servicio";
        this.subtitle = "Datos del servicio"
        this.servicioService.getById(this.id).subscribe((res) => {
          if(res.item.img) {
            this.imgPath = res.item.img; 
            
            this.img = `${environment.supabase.urlStorage}/user1/${res.item.img}`;
            
            
          }
          this.form.patchValue(res.item);
          
        });

      }
    });
  }

  ngSubmit() {
    if(this.form.valid) {

      this.alertService.loader();

      if(this.id !== 0) {

        this.storageService.delete('servicios',`user1/${this.imgPath}`).then();
        
        if(this.file && this.img !== 'http://placehold.it/180') {


          const id = uuid();
          this.storageService.upload('servicios',`user1/${id}.png`,this.file!).then((res) => {
            if(res.data) {
              this.form.value.img = `${id}.png`;
              this.updateServicio();
            }
          });

        } else {
          this.form.value.img = null;
          this.updateServicio();
        }
        
      } else {

        if(this.file && this.img !== 'http://placehold.it/180') {
          const id = uuid();
          this.storageService.upload('servicios',`user1/${id}.png`,this.file!).then((res) => {
            if(res.data) {
              this.form.value.img = `${id}.png`;
              this.createServicio();
            }
          });
        } else {
          this.form.value.img = null;
          this.createServicio();
        }

        
      }

    }
  }

  updateServicio() {
    this.servicioService.update(this.id,this.form.value).subscribe((res) => {
      if(res.ok) {
        this.alertWithSuccess();
        this.router.navigate(["/admin/servicios"]);
      }
    });
  }

  createServicio() {
    this.servicioService.create(this.form.value).subscribe((res) => {
      if(res.ok) {
        this.alertWithSuccess();
        this.router.navigate(["/admin/servicios"]);
      }
    });
  }

  alertWithSuccess(){
    Swal.fire('Éxito!', 'Registro guardado correctamente!', 'success')
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.img = reader.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  

  clearImage(){
    this.img = "http://placehold.it/180";
    this.fileInput.nativeElement.value = ''; 
    this.file = null;
  }

}
