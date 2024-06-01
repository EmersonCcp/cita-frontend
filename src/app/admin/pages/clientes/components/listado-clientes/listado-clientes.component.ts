import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, } from '@angular/material/paginator';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono','sexo','direccion','email','fecha_nacimiento','accion'];
  clientes: Cliente[] = []
  dataSource: MatTableDataSource<Cliente>;;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private alertService: AlertService
  ){
    this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
  }

  ngOnInit(): void {
      this.clienteService.getAll().subscribe((res) => {
        this.clientes = res.items;
        this.dataSource.data = this.clientes;
        this.dataSource.paginator = this.paginator;
      })
  }

  deleteCliente(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'El registro no podrá recuperarse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No'
    }).then((result) => {
      
      if (result.value) {
        this.clienteService.delete(id).subscribe((res) => {
          if(res.ok) {
            this.clientes = this.clientes.filter(c => c.id !== id);
            this.dataSource.data = this.clientes;
            this.alertService.successOrError('Registro eliminado!','','success');
        } else {
          this.alertService.successOrError('Error!','El dato puede estar en uso','error');
        }
        });
      } 
    })
  }

  
}






