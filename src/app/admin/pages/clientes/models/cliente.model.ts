
export class Cliente {
    id: number;
    nombre: string;
    apellido?: string;
    telefono?: string;
    sexo?: string;
    fecha_nacimiento?: Date;
    direccion?: string;
    email?: string;
  
    constructor(
      id: number,
      nombre: string,
      apellido?: string,
      telefono?: string,
      sexo?: string,
      fecha_nacimiento?: Date,
      direccion?: string,
      email?: string
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
      this.sexo = sexo;
      this.fecha_nacimiento = fecha_nacimiento;
      this.direccion = direccion;
      this.email = email;
    }
  }
  