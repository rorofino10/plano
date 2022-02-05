import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core' 
import { ArcRotateCamera, Color3, HemisphericLight, StandardMaterial, Texture, Viewport } from '@babylonjs/core' 
import { Color4, Engine, FreeCamera, Light, Mesh, MeshBuilder, Scene, SceneLoader, Tools, UniversalCamera, Vector3 } from '@babylonjs/core' 
import "@babylonjs/loaders" 

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  private engine: Engine | undefined 
  private scene: Scene | undefined 
  private svg: Mesh | undefined 
  private light: HemisphericLight | undefined 
  private camera: ArcRotateCamera | undefined
  private model: SceneLoader | any
  public open: boolean = false
  private meshes: any 

  @ViewChild('renderCanvas', { static: true }) renderCanvas!: ElementRef 

  constructor() {

  }

  ngOnInit(): void {
    this.modelEngine() 
  }

  modelEngine() {

    const self = this

    this.engine = new Engine(this.renderCanvas.nativeElement, true) 

    this.scene = new Scene(this.engine) 

    this.camera = new ArcRotateCamera("CameraX", 1.5708, 0, 40, new Vector3(0, 0, 0), this.scene) 
    this.camera.attachControl(this.renderCanvas.nativeElement, true) 
    this.camera.wheelPrecision = 5 
    this.camera.lowerRadiusLimit = 2 
    this.camera.upperRadiusLimit = 40 
    this.camera.panningSensibility = 1950
    

    
    // this.camera.alpha = -Math.PI/2 

    // this.camera.beta = 0.01 

    // this.camera.radius = 85 

    // this.camera.target = new Vector3(0, 0, 0) 


    this.light = new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene) 
    // this.light.groundColor = new Color3.Gray 

    // this.scene.createDefaultLight() 

    this.model = SceneLoader.ImportMesh("", "./assets/", "planocomotuhermana.gltf", this.scene, function(meshes) {
      self.meshes = meshes
      if (meshes) {
        meshes[1].material!.wireframe = false
      }
    }) 

    // this.svg = MeshBuilder.CreateGround("plano", {width: 6, height: 6}, this.scene) 
    // this.svg.rotation.x = Tools.ToRadians(270) 

    // const oneTexture = new Texture('./assets/siderca_gerencia.svg', this.scene)  // or you can just load the SVG as a file normally :v
    // oneTexture.hasAlpha = true  // enables transparency
    // // this.svg.material = new StandardMaterial("", this.scene) 
    // const svgmaterial = new StandardMaterial("", this.scene) 
    // svgmaterial.diffuseTexture = oneTexture 

    // this.svg.material = svgmaterial 
    this.engine.runRenderLoop(() => {
      if (this.camera) {
        // console.log(this.camera.alpha) 
        // console.log(this.camera.radius) 
        // console.log(this.camera.beta) 
        // console.log(this.camera.target) 
        this.camera.panningSensibility = (this.camera.radius-2)/38*-1850+1950
        // console.log(this.camera.panningSensibility)

        if (this.camera.target.z <= -20 || this.camera.target.z >=8) {
          this.camera.target.z = 0
        }
        if (this.camera.target.x <= -18 || this.camera.target.x >=18) {
          this.camera.target.x = 0
        }
      }
      if (this.scene) {
        this.scene.render() 
      }
      this.renderCanvas.nativeElement.onresize = function() {
        if (self.engine){
          self.engine.resize();
        }
      };
      window.onresize = function() {
        if (self.engine){
          self.engine.resize();
        }
    };      
    })

  }

  toggleWireframe(){
      this.meshes[1].material.wireframe = !this.meshes[1].material.wireframe
  }

  toggleToolbox(){
    this.open = !this.open 
  }
  
  resetCameraRotation() {
    if (this.camera) {
      this.camera.alpha = 1.5708 
      this.camera.beta = 0 
    }
  }
  setDefaultView() {
    if (this.camera){
      this.camera.target = new Vector3(0, 0, 0) 

      this.camera.alpha = 1.5708 

      this.camera.beta = 0 

      this.camera.radius = 40 
    }
  }

  zoomIn(){
    if (this.camera) {
      this.camera.radius = this.camera.radius - 5 
    }
  }
  zoomOut(){
    if (this.camera) {
      this.camera.radius = this.camera.radius + 5 
    }
  }
}
