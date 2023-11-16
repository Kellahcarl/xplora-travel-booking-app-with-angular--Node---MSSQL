import { Component } from '@angular/core';
import { Carousel, initTE } from 'tw-elements';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
ngOnInit(){initTE({ Carousel });}
}
