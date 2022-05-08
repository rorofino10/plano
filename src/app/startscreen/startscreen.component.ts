import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewerComponent } from '../viewer/viewer.component';
import { ToggleComponentsService } from '../toggle-components.service';
// import list from './list.json'
// import list from './itemsList.json'
import list from './items.json'
import { start } from 'repl';
@Component({
  selector: 'startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent implements OnInit {
  @Input() isOn: boolean = true
  color: string | undefined
  public show = false
  public value: any
  public searchText!: string;
  public menu: Object | any
  public label: HTMLLabelElement | any;
  @ViewChild('start', { static: true })
  body!: ElementRef;
  @ViewChild('litem', { static: true })
  litem!: ElementRef;
  // url: string = 'https://jsonplaceholder.typicode.com/users';
  // usersArray: Array = [];
  filtereditems: any
  li!: number;
  math!: Math;
  // @ViewChild("search")
  // search!: ElementRef; 
  // @ViewChild("label")
  // label!: ElementRef; 
  constructor(private http: HttpClient, public viewerComponent: ViewerComponent, public toggleComponentService: ToggleComponentsService) {
    this.filtereditems = list.items.sort()
    this.color = this.toggleComponentService.color
  }
  ngOnInit(): void {

    // this.toggleComponentService.colorSwitch.subscribe(val => {
    //   this.color = val
    // })
    this.li = document.getElementsByTagName('li').length
  }
  ngAfterViewInit(): void {
    // this.color = this.body.nativeElement.style.background
  }
  onSearchChange() {
    const str = this.searchText.toLowerCase()
    const arr = (str != "") ? str.split(" ") : []

    if (arr.length>0) {
      this.filtereditems = list.items.filter(item => {
        if (arr.find((e: string) => item.gltf.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "").includes(e))){
          return true
        }
        else return false
      }).sort()
    }
    else this.filtereditems = list.items
  }

}
