import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paraguayCurrency'
})
export class ParaguayCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // Implementa la lógica para formatear el número a la moneda de Paraguay
    return value.toLocaleString('es-PY') + 'Gs';
  }
}