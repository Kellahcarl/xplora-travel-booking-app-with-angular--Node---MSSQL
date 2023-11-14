import { Component } from '@angular/core';
import { Modal, Ripple, initTE, Tab, Input } from 'tw-elements';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  ngOnInit() {
    initTE({ Tab, Input });
  }
}
