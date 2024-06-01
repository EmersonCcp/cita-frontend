import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  private toggleSubject = new BehaviorSubject<boolean>(false);
  toggleState$ = this.toggleSubject.asObservable();

  setToggleState(state: boolean) {
    this.toggleSubject.next(state);
  }
}
