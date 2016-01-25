import Configuration from '../helpers/Configuration'
import Scene from '../components/Core/Scene'
import Camera from '../components/Core/Camera'
import Renderer from '../components/Core/Renderer'
import HemisphereLight from '../components/Core/HemisphereLight'
import JsonMesh from '../components/Core/JsonMesh'
import Clock from '../components/Utils/Clock'
import GUI from '../components/Utils/GUI'
import TextureLoader from '../helpers/TextureLoader'

export default [
  // --- Services
  {
    type: 'service',
    name: 'Configuration',
    constructor: Configuration
  },
  {
    type: 'service',
    name: 'Scene',
    constructor: Scene
  },
  {
    type: 'service',
    name: 'Camera',
    constructor: Camera,
    dependencies: [ 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Renderer',
    constructor: Renderer
  },
  {
    type: 'service',
    name: 'HemisphereLight',
    constructor: HemisphereLight
  },
  {
    type: 'service',
    name: 'JsonMesh',
    constructor: JsonMesh
  },
  {
    type: 'service',
    name: 'Clock',
    constructor: Clock
  },
  {
    type: 'service',
    name: 'GUI',
    constructor: GUI
  },
  {
    type: 'service',
    name: 'TextureLoader',
    constructor: TextureLoader,
    dependencies: [ 'Configuration' ]
  }
]
