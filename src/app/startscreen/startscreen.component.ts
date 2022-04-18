import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewerComponent } from '../viewer/viewer.component';
import { ToggleComponentsService } from '../toggle-components.service';
import list from './list.json'
import { start } from 'repl';
@Component({
  selector: 'startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent implements OnInit {
  @Input() isOn: boolean = true
  @Input() color: any
  public show = false
  public value: any
  public searchText: any
  public menu: Object | any
  public label: HTMLLabelElement | any;
  @ViewChild('start', { static: true })
  body!: ElementRef;
  @ViewChild('litem', { static: true })
  litem!: ElementRef;
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
  ngOnInit(): void {
    this.toggleComponentService.onMenuChange.subscribe(val => {
      this.isOn = true
    })
  }
  ngAfterViewInit(): void {
    // this.color = this.body.nativeElement.style.background
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


  hide() {
    this.isOn = false

  }
}
