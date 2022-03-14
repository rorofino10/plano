import { Injectable, Output } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

@Injectable({
  providedIn: 'root'
})
export class ToggleComponentsService {
  @Output () public isOn: boolean = true

  constructor(private viewerComponent: ViewerComponent) { }

  toggleComponent(gltf: string | File | undefined) {
    console.log(gltf)
    
    this.isOn = !this.isOn
    if (this.viewerComponent.renderCanvas.nativeElement != undefined){
      this.viewerComponent.createEngine(gltf)
      this.viewerComponent.addCamera
      this.viewerComponent.addGround
      this.viewerComponent.addLight
    }
  }
}
