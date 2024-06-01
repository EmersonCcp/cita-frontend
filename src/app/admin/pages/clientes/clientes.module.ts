import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { GuardarClienteComponent } from './components/guardar-cliente/guardar-cliente.component';
import { ClienteService } from './services/cliente.service';


@NgModule({
  declarations: [
    ClientesComponent,
    ListadoClientesComponent,
    GuardarClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class ClientesModule { }
