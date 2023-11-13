import { Component } from '@angular/core';
import { Input, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  ngOnInit() {
    initTE({ Input, Ripple });
  }
}
