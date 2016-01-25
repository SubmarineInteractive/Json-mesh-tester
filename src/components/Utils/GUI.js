import dat from 'dat-gui'

/**
 * GUI class
 */
class GUI extends dat.GUI {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super()
  }

  removeFolder(name) {
    this.__ul.removeChild(this.__folders[name].li)
    dom.removeClass(this.__folders[name].li, 'folder')
    this.__folders[name] = undefined
    this.onResize()
  }

}

export default GUI
