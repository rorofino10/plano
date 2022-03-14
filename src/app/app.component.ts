import { Component, Output } from '@angular/core';
import { ToggleComponentsService } from './toggle-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOn: boolean = true; 

  constructor (public toggleComponentService: ToggleComponentsService){
  }

  
}
