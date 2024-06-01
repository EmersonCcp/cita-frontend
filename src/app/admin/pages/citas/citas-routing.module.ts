import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './pages/citas/citas.component';
import { GuardarCitaComponent } from './components/guardar-cita/guardar-cita.component';

const routes: Routes = [
  {
    path: '',
    component: CitasComponent,
  },
  {
    path: 'guardar-cita/:id/:mode',
    component: GuardarCitaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
