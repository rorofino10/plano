import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})


export class ToolbarComponent{
  @Output() bgcolor = new EventEmitter<any>()
  public color: any
  public open: boolean = false;
  public themetoggle: boolean = true;
  public view: any = true;
  onColorChange(value: string | undefined){
    this.bgcolor.emit(value)
  }
  toggleDropdown() {
    console.log(this.view)
    // this.open = !this.open;
  }
  toggleView() {
    this.view = !this.view
  }
  toggleTheme() {
    this.themetoggle = !this.themetoggle;
  }

}

