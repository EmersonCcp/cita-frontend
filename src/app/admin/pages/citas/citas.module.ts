import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './pages/citas/citas.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListadoCitasComponent } from './components/listado-citas/listado-citas.component';
import { GuardarCitaComponent } from './components/guardar-cita/guardar-cita.component';
import { CitasService } from './services/citas.service';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    CitasComponent,
    ListadoCitasComponent,
    GuardarCitaComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  exports: [CalendarModule]
})
export class CitasModule { }
