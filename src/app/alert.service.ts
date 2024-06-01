import { Injectable } from '@angular/core';

import Swal, {SweetAlertIcon} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  loader() {
    Swal.fire({
      title: 'Aguarde!',
      html: 'Se está realizando el proceso.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }

  close() {
    Swal.close();
  }

  successOrError(title: string, subtitle: string, status: SweetAlertIcon) {
    Swal.fire(title,subtitle,status)
  }
}
