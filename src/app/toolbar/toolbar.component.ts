import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})


export class ToolbarComponent{

  public open: boolean = false;
  public themetoggle: boolean = true;

  toggleDropdown() {
    // this.open = !this.open;
  }

  toggleTheme() {
    this.themetoggle = !this.themetoggle;
  }

}

