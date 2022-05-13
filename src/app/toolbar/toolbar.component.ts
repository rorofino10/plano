import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToggleComponentsService } from '../toggle-components.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})


export class ToolbarComponent{
  public color: string = "#858383"

  constructor (public toggleComponent:ToggleComponentsService){

  }
}

