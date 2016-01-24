import Configuration from '../helpers/Configuration'
import Scene from '../components/Core/Scene'
import Camera from '../components/Core/Camera'
import Renderer from '../components/Core/Renderer'
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
