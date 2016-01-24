/**
 * JsonMesh class
 */
class JsonMesh {

  constructor() {
    this.loader = new THREE.JSONLoader()

    const model = "suzanne"

		this.loader.load( "static/models/" + model + ".json", ( geometry, materials ) => {

		})
  }

}

export default JsonMesh
