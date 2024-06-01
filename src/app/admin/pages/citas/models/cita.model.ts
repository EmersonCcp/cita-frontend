export class Cita {
    id: number;
    clienteId: number;
    nombreCompleto: string;
    servicioId: number;
    servicio: string;
    fecha?: string | Date;
    hora?: string;
    estado?: string;
    obs?: string;
  
    constructor(
      id: number,
      clienteId: number,
      nombreCompleto: string,
      servicioId: number,
      servicio: string,
      fecha?: string | Date,
      hora?: string,
      estado?: string,
      obs?: string
    ) {
      this.id = id;
      this.clienteId = clienteId;
      this.nombreCompleto = nombreCompleto;
      this.servicioId = servicioId;
      this.servicio = servicio;
      this.fecha = fecha;
      this.hora = hora;
      this.estado = estado;
      this.obs = obs
    }
  }