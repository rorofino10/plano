import { Injectable, Output } from '@angular/core';
import { Scene } from '@babylonjs/core';
import { EventEmitter } from '@angular/core';
import { AppComponent } from './app.component';
@Injectable({
  providedIn: 'root'
})
export class ToggleComponentsService {
  @Output () isOn: boolean = false
  @Output () model = new EventEmitter<any>()
  @Output () onMenuChange = new EventEmitter<any>()
  

  constructor() { }

  toggleComponent(gltf: string | File | undefined) {
    console.log(gltf)
    
    this.isOn = !this.isOn

  }

  showMenu(){
    this.onMenuChange.emit(true)
  }
  
  setModel(model: any){
    this.model.emit(model)
  }
}
