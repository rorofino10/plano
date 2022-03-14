import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewerComponent } from '../viewer/viewer.component';
import { ToggleComponentsService } from '../toggle-components.service';
// import * as fs from 'fs';

@Component({
  selector: 'startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent implements OnInit {
  @Input() isOn: boolean = true

  public show = false
  public menu: Object | any
  constructor(private http: HttpClient, public viewerComponent: ViewerComponent, public toggleComponentService: ToggleComponentsService) { 
  }
// 
  ngOnInit(): void {
    this.http.get("./assets/list.json").subscribe(response => {
      this.menu = response
    })
    this.toggleComponentService.onMenuChange.subscribe(val => {
      this.isOn = true
    })
  }
  hide(){
    this.isOn = false

  }
}
