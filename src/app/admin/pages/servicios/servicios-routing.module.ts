import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { GuardarServicioComponent } from './components/guardar-servicio/guardar-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent
  },
  {
    path: 'guardar-servicio/:id',
    component: GuardarServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
