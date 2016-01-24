import Container from 'Container'
import gui from '../Utils/GUI'
import FolderInspector from '../Utils/FolderInspector'
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
    this.gui = gui
    this.loader = new THREE.JSONLoader()
    // this.folderInspector = new FolderInspector()
    this.clock = Container.get( 'Clock' )

    this.initGUI()
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
        this.loader.load( "../models/" + model + ".json", ( geometry, materials ) => {
            this.mesh = new THREE.Mesh( geometry,  materials[0] )

            this.mesh.material.morphTargets = true;
            this.mesh.material.verticesNeedUpdate = true;
            this.mesh.material.normalsNeedUpdate = true;

            this.clipMorpher = THREE.AnimationClip.CreateFromMorphTargetSequence( 'animation_', this.mesh.geometry.morphTargets, 25 )

    				this.mixer = new THREE.AnimationMixer( this.mesh )
    				this.mixer.addAction( new THREE.AnimationAction( this.clipMorpher ) )

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
    // const folder = this.gui.addFolder( 'Mesh' )
    // folder.add( this, 'active' )

    console.log(this.folderInspector);
  }

  /**
   * Animation call by raf
   * @return {void}
   */
  animate() {
    const delta = 10 * this.clock.getDelta()

    if(this.mesh) {
      this.mesh.rotation.y += 0.003
    }

    if( this.mixer ) {
			this.mixer.update( delta );
		}
  }

}

export default JsonMesh
