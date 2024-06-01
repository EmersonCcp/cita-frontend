import { Component } from '@angular/core';
import { ToggleService } from 'src/shared/services/toggle.service';

interface NavItem {
  icon: string;
  title: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})


export class SidebarLayoutComponent {

  navItems: NavItem[] = [
    {
      icon: 'fa-solid fa-chart-pie',
      title: 'Dashboard',
      route: "dashboard"
    },
    {
      icon: 'fa-solid fa-people-group',
      title: 'Clientes',
      route: "clientes"
    },
    {
      icon: 'fa-solid fa-notes-medical',
      title: 'Servicios',
      route: "servicios"
    },
    {
      icon: 'fa-solid fa-calendar-days',
      title: 'Citas',
      route: 'citas'
    },
    {
      icon: 'fa-solid fa-money-bill',
      title: 'Ingresos',
      route: "ingresos"
    },
  ]

  isSidebarToggled: boolean = true;

  constructor(
    private toggleService: ToggleService
  ){}

  ngOnInit() {
    this.toggleService.toggleState$.subscribe(state => {
      this.isSidebarToggled = !this.isSidebarToggled;
      
    });
  }

  mouseover() {
    if(this.isSidebarToggled) {
      this.isSidebarToggled = false;
    }
  }

}
