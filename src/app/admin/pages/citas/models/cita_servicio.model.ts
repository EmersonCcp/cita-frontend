export class CitaServicio {
    id?: number;
    citaId?: number;
    servicioId: number;
    servicio?: string;
    monto: number;
  
    constructor(
      id: number,
      citaId: number,
      servicioId: number,
      servicio: string,
      monto: number
    ) {
      this.id = id;
      this.citaId = citaId;
      this.servicioId = servicioId;
      this.servicio = servicio,
      this.monto = monto;
    }
}