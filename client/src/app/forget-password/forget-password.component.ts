import { Component } from '@angular/core';
import { Input, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  ngOnInit() {
    initTE({ Input, Ripple });
  }
}
