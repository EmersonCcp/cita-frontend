import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ListadoServiciosComponent } from './components/listado-servicios/listado-servicios.component';
import { ServicioService } from './services/servicio.service';
import { GuardarServicioComponent } from './components/guardar-servicio/guardar-servicio.component';


@NgModule({
  declarations: [
    ServiciosComponent,
    ListadoServiciosComponent,
    GuardarServicioComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ServiciosModule { }
