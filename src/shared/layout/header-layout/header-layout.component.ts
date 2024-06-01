import { Component } from '@angular/core';
import { ToggleService } from 'src/shared/services/toggle.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent {

  constructor(
    private toggleService: ToggleService
  ){}

  sendToggleEvent() {
    this.toggleService.setToggleState(true);
  }
}
