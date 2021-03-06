import { AfterViewInit, Component, ElementRef, Input,OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, switchMap } from 'rxjs'
import { Texture } from '@babylonjs/core'
import { SceneSerializer, Tools, Engine, Mesh, MeshBuilder, Scene, SceneLoader, Vector3, DebugLayer, DebugLayerTab, GizmoManager, ArcRotateCamera, Color3, HemisphericLight, StandardMaterial } from '@babylonjs/core'
import "@babylonjs/inspector"
import { GridMaterial } from "@babylonjs/materials"
import { ToggleComponentsService } from '../toggle-components.service'
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, AfterViewInit {
  @Input()
  color!: string 
  private engine: Engine | undefined
  private scene: Scene | any
  private svg: Mesh | undefined
  private light: HemisphericLight | undefined
  private camera: ArcRotateCamera | undefined
  private model: SceneLoader | any
  public open: boolean = true
  public ccmeshes: any
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
  public selectedMeshscale: any
  public view: any
  public isfullscreen: any = false
  public assetshow: any = true
  public inspectorvis: any = false
  public isOn: boolean = false
  private groundgrid: any = true
  private groundstandard: any = false

  @ViewChild('renderCanvas', { static: true }) renderCanvas!: ElementRef
  @ViewChild('camerabar', { static: true }) camerabar!: ElementRef
  @ViewChild('meshprop', { static: true }) meshprop!: ElementRef
  private showgrid: any = true
  private ground: Mesh | any
  file: File | undefined
  modelo: any
  plano: ParamMap | undefined
  constructor(
    public toggleComponentService: ToggleComponentsService, 
    private route: ActivatedRoute
    ) {
  }


  ngOnInit(): void {

    // this.toggleComponentService.model.subscribe( file => {
    //   this.isOn = true
    //   this.file = file
    //   this.startScene()
    //   if (this.scene && this.color){
    //     this.scene.clearColor = Color3.FromHexString(this.color)
    //   }
    // })
    // this.toggleComponentService.onMenuChange.subscribe( val => {
    //   this.engine?.dispose()
    //   this.scene?.dispose()
    //   this.isOn = false
    // })
  }
  ngAfterViewInit(): void {
    this.startScene(String(this.route.snapshot.paramMap.get('name')))
    this.toggleComponentService.colorSwitch.subscribe(color => {
      this.color = color
        this.scene.clearColor = Color3.FromHexString(this.color)
    }
    )
  }
  ngOnChanges(): void{
    if (this.scene){
      this.scene.clearColor = Color3.FromHexString(this.color)
    }
  }

  startScene(file: string | undefined) {
    this.createEngine(file)
    this.addGround()
    this.addLight()
    this.addCamera()
    this.startRender()
  }
  createEngine(file: string | File | undefined) {

    const self = this
    this.engine = new Engine(this.renderCanvas.nativeElement, true)

    this.scene = new Scene(this.engine)
    this.scene.clearColor = Color3.FromHexString(this.toggleComponentService.color)

    this.scene.onPointerDown = function (evt: any, evtdata: any) {
      console.log(this.mesh)
      if (self.camera) {
        console.log(self.camera.alpha)
        console.log(self.camera.radius)
        console.log(self.camera.beta)
        console.log(self.camera.target)
        console.log(self.camera.panningSensibility)
      }
    }





    this.gizmoManager = new GizmoManager(this.scene)
    this.gizmoManager.clearGizmoOnEmptyPointerEvent = true;
    this.gizmoManager.positionGizmoEnabled = true;
    this.gizmoManager.rotationGizmoEnabled = false;
    this.gizmoManager.scaleGizmoEnabled = false;
    this.gizmoManager.boundingBoxGizmoEnabled = false;
    this.gizmoManager.usePointerToAttachGizmos = true;
    this.gizmoManager.onAttachedToMeshObservable.add((evt) => {
      console.log(this.selectedMesh)
      this.selectedMesh = evt
      if (this.selectedMesh) {
        this.selectedMeshpositionx = this.selectedMesh.position.x.toFixed(2)
        this.selectedMeshpositiony = this.selectedMesh.position.y.toFixed(2)
        this.selectedMeshpositionz = this.selectedMesh.position.z.toFixed(2)

        this.selectedMeshrotatex = this.selectedMesh.rotation.x.toFixed(2)
        this.selectedMeshrotatey = this.selectedMesh.rotation.y.toFixed(2)
        this.selectedMeshrotatez = this.selectedMesh.rotation.z.toFixed(2)

        this.selectedMeshscale = Math.abs(this.selectedMesh.scaling.z.toFixed(2) * 100)
        this.selectedMeshscale = Math.abs(this.selectedMesh.scaling.x.toFixed(2) * 100)
        this.selectedMeshscale = Math.abs(this.selectedMesh.scaling.y.toFixed(2) * 100)

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
    // this.gizmoManager.gizmos.rotationGizmo?.onDragEndObservable.add((evt) => {
    //   this.selectedMeshrotatex = this.selectedMesh.rotation.x.toFixed(2)
    //   this.selectedMeshrotatey = this.selectedMesh.rotation.y.toFixed(2)
    //   this.selectedMeshrotatez = this.selectedMesh.rotation.z.toFixed(2)
    // })
    // this.gizmoManager.gizmos.scaleGizmo?.onDragEndObservable.add((evt) => {
    //   this.selectedMeshscale = this.selectedMesh.scaling.x.toFixed(2)
    //   this.selectedMeshscale = this.selectedMesh.scaling.y.toFixed(2)
    //   this.selectedMeshscale = this.selectedMesh.scaling.z.toFixed(2)
    // })

    this.modelo = SceneLoader.ImportMesh("", "./assets/planos/", (file + ".gltf"), this.scene, function (meshes) {
      self.ccmeshes = meshes
      if (meshes) {
        console.log(meshes[0]);
        meshes[0].scaling = new Vector3(1, 1, -1)
      }
      meshes.forEach(mesh => {
        mesh.isPickable = false
      });
    })
    // const ground_standard = new StandardMaterial("ground_standar", this.scene)
    // ground_standard.alpha = 0.1
    // ground_standard.diffuseColor = new Color3(0.458, 0.447, 1)

    // function selectedGroundMaterial(){
    //   ground_grid = true; 
    // };

    // const ground_grid = new GridMaterial("ground_grid", this.scene);
    // ground_grid.mainColor = new Color3(0.458, 0.447, 1)
    // ground_grid.transparencyMode = 3
    // ground_grid.lineColor = new Color3(0, 0, 0)
    // ground_mat.diffuseColor = new Color3(1.0, 0.2, 0.7)

    // const selectedGroundMaterial = () =>{
    //   if (this.showgrid){
    //     return this.groundgrid
    //   }
    //   if (this.showgrid == false){
    //     return this.groundstandard
    //   }
    // }




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
  }

  addCamera() {
    this.camera = new ArcRotateCamera("CameraX", 0, 0, 25, new Vector3(0, 0, 0), this.scene)
    this.camera.attachControl(this.renderCanvas.nativeElement, true)
    this.camera.useBouncingBehavior = false
    this.camera.useFramingBehavior = true
    // this.camera.setTarget(this.modelo)
    this.camera.wheelPrecision = 50
    this.camera.lowerRadiusLimit = 1.1
    this.camera.upperRadiusLimit = 200
    // this.camera.panningSensibility = 1950
  }
  addSVG(){
    const svg = MeshBuilder.CreateGround("svg", {height:20, width: 20, subdivisions: 8}, this.scene)
    const svgtexture = new Texture("./assets/svg/Test1.svg", this.scene)
  }
  addGround() {
    // const apara = MeshBuilder.CreateGround("ground",  {height: 200, width: 300, subdivisions: 8}, this.scene)
    // apara.overlayColor
    this.ground = MeshBuilder.CreateGround("ground", { height: 1000, width: 1000, subdivisions: 8 }, this.scene)
    this.ground.isPickable = false
    this.groundstandard = new StandardMaterial("ground_standar", this.scene)
    this.groundstandard.alpha = 0
    this.groundstandard.diffuseColor = new Color3(0, 0, 0)
    // this.groundstandard.overlayColor = new Color3(1,1,1)

    this.groundgrid = new GridMaterial("ground_grid", this.scene);
    this.groundgrid.mainColor = new Color3(0.458, 0.447, 1)
    this.groundgrid.lineColor = new Color3(1, 1, 1)
    this.groundgrid.opacity = 0.99
    this.ground.material = this.groundgrid
  }
  addLight() {
    this.light = new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene!)
    this.light.excludedMeshes.push()
  }
  createText() {
    // var textBlock = new BABYLON.GUI.TextBlock('textblock', 'hello world!');
    // textBlock.color = 'white';
    // textBlock.fontSize = '36px';
    // textBlock.fontFamily = "'Segoe UI', 'Segoe UI Web (West European)', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans serif'";
    // textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    // textBlock.paddingLeft = 20;
    // textBlock.paddingRight = 20;
    // textBlock.resizeToFit = true;
    // rect1.addControl(textBlock);
  }
  startRender() {
    const self = this
    this.engine!.runRenderLoop(() => {

      if (this.camera) {
        // console.log(this.camera.alpha) 
        // console.log(this.camera.radius) 
        // console.log(this.camera.beta) 
        // console.log(this.camera.target) 
        // this.camera.panningSensibility = (this.camera.radius - 2) / 38 * -1850 + 1950
        // console.log(this.camera.panningSensibility)

        // if (this.camera.target.z <= -20 || this.camera.target.z >=8) {
        //   this.camera.target.z = 0
        // }
        // if (this.camera.target.x <= -18 || this.camera.target.x >=18) {
        //   this.camera.target.x = 0
        // }
        if (this.camera.beta > Math.PI / 2) {
          this.camera.beta = Math.PI / 2 - 0.01
        }
      }
      if (this.scene) {
        this.scene.render()
      }
      this.renderCanvas.nativeElement.onresize = function () {
        if (self.engine) {
          self.engine.resize();
        }
      };
      window.onresize = function () {
        if (self.engine) {
          self.engine.resize();
        }
      };
    })
  }
  clone(){
    this.selectedMesh.clone(this.selectedMesh.name, "Clone")
  }
  toggleGroundMaterial() {

    this.showgrid = !this.showgrid
    if (this.showgrid) {
      this.ground.material = this.groundgrid
    }
    if (this.showgrid == false) {
      this.ground.material = this.groundstandard
    }

  }
  importMesh(importedMesh: string | File | undefined) {
    SceneLoader.ImportMesh("", "./assets/", importedMesh, this.scene, function (meshes) {
      // console.log(meshes[0].rotation)
      // meshes.forEach(mesh => {
      //   mesh.material!.wireframe = true
      // })
    })
    this.assetshow = false
  }

  loadScene() {
    this.scene.dispose()
    this.scene =  SceneLoader.Load("./assets/", "example.babylon", this.engine)
    
  }

  toggleWireframe() {
    // this.selectedMesh.material.wireframe = !this.selectedMesh.material.wireframe
    this.ccmeshes[1].material.wireframe = !this.ccmeshes[1].material.wireframe
  }
  toggleToolbox() {
    this.open = !this.open
  }
  openFullscreen() {
    const elem = this.renderCanvas.nativeElement


    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  resetCameraRotation() {
    if (this.camera) {
      this.camera.alpha = 1.5708
      this.camera.beta = 0
    }
  }
  setDefaultView() {
    if (this.camera) {
      this.camera.target = new Vector3(0, 0, 0)

      this.camera.alpha = 0

      this.camera.beta = 0

      this.camera.radius = 25
    }
  }
  zoomIn() {
    if (this.camera) {
      this.camera.radius = this.camera.radius - 5
    }
  }
  zoomOut() {
    if (this.camera) {
      this.camera.radius = this.camera.radius + 5
    }
  }
  updateMeshPosition() {
    this.selectedMesh.position.x = this.selectedMeshpositionx
    this.selectedMesh.position.y = this.selectedMeshpositiony
    this.selectedMesh.position.z = this.selectedMeshpositionz
    // this.selectedMesh.rotation.x = this.selectedMeshrotatex  
    // this.selectedMesh.rotation.y = this.selectedMeshrotatey  
    // this.selectedMesh.rotation.z = this.selectedMeshrotatez  

    this.selectedMesh.scaling.z = Math.abs(this.selectedMeshscale / 100)
    this.selectedMesh.scaling.x = Math.abs(this.selectedMeshscale / 100)
    this.selectedMesh.scaling.y = Math.abs(this.selectedMeshscale / 100)


  }
  moveGizmo() {
    if (this.gizmoManager) {
      this.gizmoManager.positionGizmoEnabled = true;
      this.gizmoManager.rotationGizmoEnabled = false;
      this.gizmoManager.scaleGizmoEnabled = false;
      this.gizmoManager.boundingBoxGizmoEnabled = false;
    }
  }

  toggleInspector() {
    if (this.inspectorvis == true) {
      this.scene!.debugLayer.hide()
    }
    if (this.inspectorvis == false) {
      {
        this.scene!.debugLayer.show({
          overlay: false,
          embedMode: true
        });
      }
    }
    console.log(this.inspectorvis)
    this.inspectorvis = !this.inspectorvis
    console.log(this.inspectorvis);

  }

  showInspector() {
    if (this.scene) {
      this.scene.debugLayer.show({
        overlay: false,
        embedMode: true
      });
    }
  }

  screenshot() {
    Tools.CreateScreenshot(this.engine!, this.camera!, 400)
    console.log('SS');

  }

  deleteMesh() {
    if (this.selectedMesh) {
      this.selectedMesh.dispose()
      this.selectedMesh = null
    }
  }

  showAsset() {
    this.assetshow = !this.assetshow
  }


  saveScene(filename: string, mesh: any) {
    var objectUrl;
    if (objectUrl) {
      window.URL.revokeObjectURL(objectUrl);
    }

    var serializedMesh = SceneSerializer.SerializeMesh(mesh);

    var strMesh = JSON.stringify(serializedMesh);

    if (filename.toLowerCase().lastIndexOf(".babylon") !== filename.length - 8 || filename.length < 9) {
      filename += ".babylon";
    }

    var blob = new Blob([strMesh], { type: "octet/stream" });

    // turn blob into an object URL; saved as a member, so can be cleaned out later
    objectUrl = (window.webkitURL || window.URL).createObjectURL(blob);

    var link = window.document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    var click = document.createEvent("MouseEvents");
    click.initEvent("click", true, false);
    link.dispatchEvent(click);
  }

  // rotateGizmo(){
  //   if (this.gizmoManager) {
  //     this.gizmoManager.positionGizmoEnabled = false;
  //     this.gizmoManager.rotationGizmoEnabled = true;
  //     this.gizmoManager.scaleGizmoEnabled = false;
  //     this.gizmoManager.boundingBoxGizmoEnabled = false;
  //   }
  // }
  // scaleGizmo(){
  //   if (this.gizmoManager) {
  //     this.gizmoManager.positionGizmoEnabled = false;
  //     this.gizmoManager.rotationGizmoEnabled = false;
  //     this.gizmoManager.scaleGizmoEnabled = true;
  //     this.gizmoManager.boundingBoxGizmoEnabled = false;
  //   }
  // }
}
