import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('./pages/servicios/servicios.module').then(m => m.ServiciosModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('./pages/citas/citas.module').then(m => m.CitasModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
