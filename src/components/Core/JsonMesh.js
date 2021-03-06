import Container from 'Container'
import gui from '../Utils/GUI'

/**
 * JsonMesh class
 */
class JsonMesh {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    this.mesh
    this.mixer
    this.clipMorpher
    this.currentMesh = 'suzanne'
    this.loader = new THREE.JSONLoader()
      // this.folderInspector = new FolderInspector()
    this.scene = Container.get('Scene')
    this.clock = Container.get('Clock')
    this.gui = Container.get('GUI')
    this.guiIsInit = false;

    // GUI Vars
    this.scale = 10
    this.animationSpeed = 10
    this.enableRotation = true
    this.enableAnimation = true

    this.getMeshesList().then((response) => {
      console.log("Succès !", response)
      this.meshList = JSON.parse(response)

        this.initGUI()
    }, (error) => {
      console.error("Error !", error)
    })

  }

  /**
   * Get Meshes List
   * @return {promise} - Promise containing meshes list
   */
  getMeshesList() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      const URL = '/api/v1/mesh'

      req.open('GET', URL)

      req.onload = () => {
        if (req.status === 200) {
          resolve(req.response)
        } else {
          console.log('error')
          reject(Error(req.statusText))
        }
      };

      req.onerror = () => {
        reject(Error("Error"))
      };

      req.send()
    })
  }

  /**
   * Load a json model function
   * @param {string} model Model name
   * @param {function} callback Callback function
   * @return {void}
   */
  loadModel(model) {


    return new Promise((resolve, reject) => {
      try {
        this.loader.load("../models/" + model, (geometry, materials) => {
          this.mesh = new THREE.Mesh(geometry, materials[0])

          this.mesh.material.morphTargets = true;
          this.mesh.material.verticesNeedUpdate = true;
          this.mesh.material.normalsNeedUpdate = true;

          this.clipMorpher = THREE.AnimationClip.CreateFromMorphTargetSequence('animation_', this.mesh.geometry.morphTargets, 25)

          this.mixer = new THREE.AnimationMixer(this.mesh)
          this.mixer.addAction(new THREE.AnimationAction(this.clipMorpher))

          resolve(this.mesh)
        })
      } catch (e) {
        reject("error ", e)
      }
    })
  }

  /**
   * InitGUI function
   * @return {void}
   */
  initGUI() {
    this.folder = this.gui.addFolder('Mesh')

    this.folder.open()

    this.folder.add(this, 'currentMesh', this.meshList).onChange((newValue) => {
      this.currentMesh = newValue
      this.scene.meshIsLoaded = false
      this.scene.remove(this.mesh)

      this.loadModel(this.currentMesh).then(() => {
        const bbox = new THREE.Box3().setFromObject(this.mesh)

        this.mesh.position.y = Math.abs(bbox.min.y) + 20
        this.mesh.rotation.y = 0
        this.scene.add(this.mesh)
        this.scene.meshIsLoaded = true

      })

    })

    this.folder.add(this, 'animationSpeed', 0, 30)

    this.folder.add(this, 'scale', 0.5, 30).onChange((newValue) => {
      this.mesh.position.y = 0

      const bbox = new THREE.Box3().setFromObject(this.mesh)

      this.mesh.position.y = Math.abs(bbox.min.y) + 20
    })

    this.folder.add(this, 'enableAnimation')
    this.folder.add(this, 'enableRotation')

    this.guiIsInit = true
  }

  /**
   * destroyGUI function
   * @return {void}
   */
  destroyGUI() {
    this.gui.removeFolder('Mesh');
  }

  /**
   * Update mesh list
   * @return {void}
   */
  updateMeshList() {
    console.info('update mesh list')

    this.getMeshesList().then((response) => {
      console.log("Success !", response)

      this.meshList = JSON.parse(response)

      for (let i in this.gui.__controllers) {
        this.gui.__controllers[i].updateDisplay()
      }

      this.folder.open()
    }, (error) => {
      console.error("Error !", error)
    })

  }

  /**
   * Animation call by raf
   * @return {void}
   */
  animate() {
    const delta = this.animationSpeed * this.clock.getDelta()

    if (this.mesh && this.enableRotation) {
      this.mesh.rotation.y += 0.003
    }

    if (this.mixer && this.enableAnimation) {
      this.mixer.update(delta)
    }

    this.mesh.scale.set(this.scale, this.scale, this.scale)
  }

}

export default JsonMesh
