import Container from 'Container'

export default class UploadForm {

  constructor() {
    this.$el = document.getElementsByClassName('form')[0]
    this.$fileInput = this.$el.querySelector('.form__file-input')

    this.jsonMesh = Container.get('JsonMesh')

    console.log('el', this.$el)

    this.$el.addEventListener('submit', this.onSubmit.bind(this), false)

  }

  onSubmit(ev) {

    ev.preventDefault()


    const http = new XMLHttpRequest()

    /* Create a FormData instance */
    const formData = new FormData()
    formData.append("mesh", this.$fileInput.files[0])
    console.log( this.$fileInput.files[0])
    http.open("post", "/api/v1/mesh", true)
    http.send(formData)  /* Send to server */


    http.onreadystatechange = () => {

        if(http.readyState == 4) {

          if(http.status == 200) {
            const guiSelectInput = document.querySelector('.dg .folder select')

            let fileOrigin = this.$fileInput.value
            let fileOriginArr = fileOrigin.split(/^.*[\\\/]/)
            let fileName = fileOriginArr[fileOriginArr.length-1]

            console.log(fileName)

            this.jsonMesh.updateMeshList()
            guiSelectInput.innerHTML += `<option value="${fileName}" class="changeValue">${fileName}</option>`
            this.$fileInput.value = ''

          }

          alert(http.responseText)
        }


    }

  }
}
