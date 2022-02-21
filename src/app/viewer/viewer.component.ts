import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core' 
import { AbstractMesh, AxisDragGizmo, GizmoManager, GUID, Nullable } from '@babylonjs/core'
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
  public open: boolean = true
  private meshes: any 
  private gizmoManager: GizmoManager | undefined
  public selectedMesh: Mesh | any
  public selectedMeshpositionx: any
  public selectedMeshpositiony: any
  public selectedMeshpositionz: any
  public selectedMeshrotatex: any
  public selectedMeshrotatey: any
  public selectedMeshrotatez: any
  public selectedMeshscalex: any
  public selectedMeshscaley: any
  public selectedMeshscalez: any
  @ViewChild('renderCanvas', { static: true }) renderCanvas!: ElementRef 
  @ViewChild('meshprop', {static: true}) meshprop!: ElementRef
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
    this.camera.upperRadiusLimit = 80 
    this.camera.panningSensibility = 1950
    

    this.light = new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene) 
    this.gizmoManager = new GizmoManager(this.scene)
    this.gizmoManager.clearGizmoOnEmptyPointerEvent = true;
    this.gizmoManager.positionGizmoEnabled = true;
    this.gizmoManager.rotationGizmoEnabled = false;
    this.gizmoManager.scaleGizmoEnabled = false;
    this.gizmoManager.boundingBoxGizmoEnabled = false;
    this.gizmoManager.usePointerToAttachGizmos = true;
    this.gizmoManager.onAttachedToMeshObservable.add((evt) => {
      this.selectedMesh = evt
      if (this.selectedMesh) {
        this.selectedMeshpositionx = this.selectedMesh.position.x.toFixed(2)
        this.selectedMeshpositiony = this.selectedMesh.position.y.toFixed(2)
        this.selectedMeshpositionz = this.selectedMesh.position.z.toFixed(2)

        this.selectedMeshrotatex = this.selectedMesh.rotation.x.toFixed(2)
        this.selectedMeshrotatey = this.selectedMesh.rotation.y.toFixed(2)
        this.selectedMeshrotatez = this.selectedMesh.rotation.z.toFixed(2)

        this.selectedMeshscalex = this.selectedMesh.scaling.x.toFixed(2)
        this.selectedMeshscaley = this.selectedMesh.scaling.y.toFixed(2)
        this.selectedMeshscalez = this.selectedMesh.scaling.z.toFixed(2)
      }
    })
    this.gizmoManager.gizmos.positionGizmo?.onDragEndObservable.add((evt) => {
      console.log(this.gizmoManager!.gizmos.positionGizmo);
      if (this.selectedMesh) {
        this.selectedMeshpositionx = this.selectedMesh.position.x.toFixed(2)
        this.selectedMeshpositiony = this.selectedMesh.position.y.toFixed(2)
        this.selectedMeshpositionz = this.selectedMesh.position.z.toFixed(2)

      }
    })
    this.gizmoManager.gizmos.rotationGizmo?.onDragEndObservable.add((evt) => {
      this.selectedMeshrotatex = this.selectedMesh.rotation.x.toFixed(2)
      this.selectedMeshrotatey = this.selectedMesh.rotation.y.toFixed(2)
      this.selectedMeshrotatez = this.selectedMesh.rotation.z.toFixed(2)
    })
    this.gizmoManager.gizmos.scaleGizmo?.onDragEndObservable.add((evt) => {
      this.selectedMeshscalex = this.selectedMesh.scaling.x.toFixed(2)
      this.selectedMeshscaley = this.selectedMesh.scaling.y.toFixed(2)
      this.selectedMeshscalez = this.selectedMesh.scaling.z.toFixed(2)
    })
    


    SceneLoader.ImportMesh("", "./assets/", "planocomotuhermana.gltf", this.scene, function(meshes) {
      self.meshes = meshes
      meshes.forEach(mesh => {
        mesh.isPickable = false
      });
    }) 
    // const extintor = SceneLoader.ImportMesh("", "./assets/", "extintor.gltf", this.scene, function(meshes) {
    //   if (meshes) {
    //     console.log(meshes[0]);
    //     meshes[0].scaling = new Vector3(1, 1,-1)
    //   }
    // }) 


    // SceneLoader.ImportMesh("", "./assets/", "extintor.gltf", this.scene, function(meshes) {
    //   self.meshes = meshes
    // }) 
    // SceneLoader.ImportMesh("", "https://www.babylonjs.com/Assets/Yeti/glTF/", "Yeti_Idle.gltf", this.scene, function(meshes){
    //   if (meshes) {
    //     console.log(meshes[0]);
    //     meshes[0].scaling = new Vector3(0.35, 0.35,-0.35)
    //   }
    // })

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


  addExtintor(){
    SceneLoader.ImportMesh("", "./assets/", "extintor.gltf", this.scene)
  }
  addAxe(){
    SceneLoader.ImportMesh("", "./assets/", "axe.gltf", this.scene)
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

  updateMeshPosition(){
    this.selectedMesh.position.x = this.selectedMeshpositionx
    this.selectedMesh.position.y = this.selectedMeshpositiony
    this.selectedMesh.position.z = this.selectedMeshpositionz

    this.selectedMesh.rotation.x = this.selectedMeshrotatex  
    this.selectedMesh.rotation.y = this.selectedMeshrotatey  
    this.selectedMesh.rotation.z = this.selectedMeshrotatez  

    this.selectedMesh.scaling.x = this.selectedMeshscalex
    this.selectedMesh.scaling.y = this.selectedMeshscaley 
    this.selectedMesh.scaling.z = this.selectedMeshscalez
    
  }

  moveGizmo(){
    if (this.gizmoManager) {
      this.gizmoManager.positionGizmoEnabled = true;
      this.gizmoManager.rotationGizmoEnabled = false;
      this.gizmoManager.scaleGizmoEnabled = false;
      this.gizmoManager.boundingBoxGizmoEnabled = false;
    }
  }
  rotateGizmo(){
    if (this.gizmoManager) {
      this.gizmoManager.positionGizmoEnabled = false;
      this.gizmoManager.rotationGizmoEnabled = true;
      this.gizmoManager.scaleGizmoEnabled = false;
      this.gizmoManager.boundingBoxGizmoEnabled = false;
    }
  }
  scaleGizmo(){
    if (this.gizmoManager) {
      this.gizmoManager.positionGizmoEnabled = false;
      this.gizmoManager.rotationGizmoEnabled = false;
      this.gizmoManager.scaleGizmoEnabled = true;
      this.gizmoManager.boundingBoxGizmoEnabled = false;
    }
  }
}
