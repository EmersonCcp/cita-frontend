export class Servicio {
    id: number;
    servicio: string;
    descripcion?: string;
    precio?: number;
    img?: string;

  
    constructor(
        id: number,
        servicio: string,
        descripcion?: string,
        precio?: number,
        img?: string
    ) {
      this.id = id;
      this.servicio = servicio;
      this.descripcion = descripcion;
      this.precio = precio;
      this.img = img;
    }
  }
  