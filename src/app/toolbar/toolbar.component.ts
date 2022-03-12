import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})


export class ToolbarComponent{

  public open: boolean = false;
  public themetoggle: boolean = true;
  public view: any = true;
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

