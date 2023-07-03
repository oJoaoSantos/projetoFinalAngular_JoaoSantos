import { Component } from '@angular/core';

@Component({
  selector: 'app-homeslider',
  templateUrl: './homeslider.component.html',
  styleUrls: ['./homeslider.component.css']
})
export class HomesliderComponent {
  images =[
    { name: 'slider1.jpg', caption:'slider1' },
    { name: 'slider2.jpg', caption:'slider2' },
    { name: 'slider3.jpg', caption:'slider3' }
  ]
}
