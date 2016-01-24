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
    super(0xffffff, 0xffffff, 0.6);
    this.scene = Container.get('Scene')
    this.color.setHSL( 0.6, 1, 0.6 )
    this.groundColor.setHSL( 0.095, 1, 0.75 )
    this.position.set( 0, 500, 0 )
  }

}

export default HemisphereLight
