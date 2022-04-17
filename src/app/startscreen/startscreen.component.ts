import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewerComponent } from '../viewer/viewer.component';
import { ToggleComponentsService } from '../toggle-components.service';
import list from './list.json'
@Component({
  selector: 'startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent implements OnInit {
  @Input() isOn: boolean = true

  public show = false
  public value: any
  public searchText: any
  public menu: Object | any
  public label: HTMLLabelElement | any;
  // url: string = 'https://jsonplaceholder.typicode.com/users';
  // usersArray: Array = [];
  filtereditems: any
  // @ViewChild("search")
  // search!: ElementRef; 
  // @ViewChild("label")
  // label!: ElementRef; 
  constructor(private http: HttpClient, public viewerComponent: ViewerComponent, public toggleComponentService: ToggleComponentsService) {
    this.filtereditems = list.Planos.items
    // this.http.get("./assets/list.json").subscribe(response => {
    //   this.menu = response
    // })
    // this.http.get(this.url).subscribe(data => {
    //   // Populating usersArray with names from API
    //   data.json().forEach(element => {
    //     this.usersArray.push(element.name);
    //   });
    // });
  }
  onSearchChange() {
    const str = this.searchText.toLowerCase()
    const arr: [] = (str != "") ? str.split(" ") : []

    if (arr.length>0) {
      this.filtereditems = list.Planos.items.filter(item => {
        if (arr.find((e: string) => item.gltf.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "").includes(e))){
          return true
        }
        else return false
      })
    }
    else this.filtereditems = list.Planos.items
  }
  ngOnInit(): void {
    this.toggleComponentService.onMenuChange.subscribe(val => {
      this.isOn = true
    })
    const label = document.querySelector("label")
    const search = document.querySelector("input")
  }
  changeVal() {
    this.label.textContent = "YA"
    // this.search.nativeElement.value = this.label.nativeElement.value
  }
  hide() {
    this.isOn = false

  }
}
