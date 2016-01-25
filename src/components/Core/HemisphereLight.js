import Container from 'Container'

/**
 * HemisphereLight class
 */
class HemisphereLight extends THREE.HemisphereLight {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super(0xffffff, 0xffffff, 1.3);

    this.color.setHSL( 0.6, 1, 0.6 )
    console.log(this);
    this.groundColor.setHSL( 0.095, 1, 0.75 )
    this.position.set( 0, 500, 0 )

    this.gui = Container.get( 'GUI' )

    // GUI Vars

    this.initGUI()
  }

  /**
   * InitGUI function
   * @return {void}
   */
  initGUI() {
    const lights = this.gui.addFolder('Lights')
    const lightsColor = lights.addFolder('Lights Color')
    const groundColor = lights.addFolder('Ground Color')

    lights.add(this, 'intensity', 0, 10)
    lightsColor.add(this.color, 'r', 0, 1).name('color r')
    lightsColor.add(this.color, 'g', 0, 1).name('color g')
    lightsColor.add(this.color, 'b', 0, 1).name('color b')

    groundColor.add(this.groundColor, 'r', 0, 1).name('color r')
    groundColor.add(this.groundColor, 'g', 0, 1).name('color g')
    groundColor.add(this.groundColor, 'b', 0, 1).name('color b')



  }

}

export default HemisphereLight
