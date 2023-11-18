import { Component } from '@angular/core';
import { Modal, Ripple, initTE, Datetimepicker, Input, Tab } from 'tw-elements';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  ngOnInit() {
    initTE({ Modal, Ripple, Datetimepicker, Input, Tab });
  }
}
