import Stats from 'stats.js'
import raf from 'raf'
import Container from 'Container'
import JsonMesh from './JsonMesh'

import { Events } from 'helpers'

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super()

    this.camera
    this.renderer
    this.meshIsLoaded = false
    this.container   = document.getElementById( 'container' )

  }

  /**
   * Begin function
   * @return {void}
   */
  begin() {

     // Renderer
    this.renderer = Container.get( 'Renderer' )
    this.container.appendChild( this.renderer.domElement )

    // Camera
    this.camera = Container.get( 'Camera' )
    console.log(this.camera);
    this.add( this.camera )

    // Lights
    this.hemisphereLight = Container.get( 'HemisphereLight' )
    this.add( this.hemisphereLight )

    // Add mesh
    this.jsonLoaderMesh = new JsonMesh()
    this.jsonLoaderMesh.loadModel("suzanne").then( () => {

      const bbox = new THREE.Box3().setFromObject(this.jsonLoaderMesh.mesh)

      this.jsonLoaderMesh.mesh.position.y = Math.abs(bbox.min.y) + 20;

      this.add(this.jsonLoaderMesh.mesh);
      this.meshIsLoaded = true
    });

    // Post processing
    // this.postProcessing = Container.get( 'PostProcessing' )

    // Texture loader
    this.textureLoader = Container.get( 'TextureLoader' )

    // Utils
    this.clock = Container.get( 'Clock' )

    // Stats
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0'
    this.container.appendChild( this.stats.domElement )

    // Create scene when textures are loaded
    this.textureLoader
      .init()
      .then( ::this.createScene )

    // Debug helpers
    if( __DEV__ ) {
      this.debug()
    }
  }

  /**
   * Debug function
   * @return {void}
   */
  debug() {
    // Axis helper
    const axis = new THREE.AxisHelper( 50 )
    this.add( axis )

    // Grid helper
    const gridHelper = new THREE.GridHelper( 65, 1 )
    this.add( gridHelper )

    // Texture loader
    Events.on( 'textureLoader:loading', ( current, total ) =>
      console.log( `[TextureLoader] Loading ${current}/${total} textures` ))

  }

  /**
   * CreateScene function
   * @return {void}
   */
  createScene() {

    this.animate()
  }

  /**
   * Animate function
   * @return {void}
   */
  animate() {

    raf( ::this.animate )
    this.stats.update()

    if(this.meshIsLoaded) {
      this.jsonLoaderMesh.animate()
    }

    this.render()
  }

  /**
   * Render function
   * @return {void}
   */
  render() {

    this.renderer.render( this, this.camera )
    // this.postProcessing.update()
  }
}

export default Scene
