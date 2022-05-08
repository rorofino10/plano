import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToggleComponentsService } from '../toggle-components.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})


export class ToolbarComponent{
  @Output() bgcolor = new EventEmitter<any>()
  public color: string = "#858383"

  constructor (public toggleComponent:ToggleComponentsService){

  }
}

