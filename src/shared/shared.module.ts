import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { SidebarLayoutMinComponent } from './layout/sidebar-layout-min/sidebar-layout-min.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ParaguayCurrencyPipe } from './pipes/paraguay-currency.pipe';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ClienteService } from 'src/app/admin/pages/clientes/services/cliente.service';
import { CitasService } from 'src/app/admin/pages/citas/services/citas.service';
import { ServicioService } from 'src/app/admin/pages/servicios/services/servicio.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { CitaServicioService } from 'src/app/admin/pages/citas/services/cita-servicio.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [SidebarLayoutComponent, SidebarLayoutMinComponent, HeaderLayoutComponent,ParaguayCurrencyPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    NgxMatFileInputModule,
    NgxMatTimepickerModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [SidebarLayoutComponent,SidebarLayoutMinComponent,HeaderLayoutComponent,MatButtonModule,MatTableModule,MatPaginatorModule,
    MatFormFieldModule,MatIconModule,MatInputModule,RouterModule,MatSelectModule,MatDatepickerModule,FormsModule,
    ReactiveFormsModule,MatNativeDateModule,HttpClientModule,ParaguayCurrencyPipe,NgxMatFileInputModule,NgxMatTimepickerModule,MatTabsModule],
  providers: [ClienteService, CitasService, ServicioService, CitaServicioService,MatTooltipModule]
})
export class SharedModule { }
