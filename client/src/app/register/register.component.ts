import { Component } from '@angular/core';
import { Input, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  ngOnInit() {
    initTE({ Input, Ripple });
  }
}
