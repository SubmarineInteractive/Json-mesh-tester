import fs from 'fs'

console.log(fs);

class FolderInspector {

  constructor(){
    this.files = []
    const path = "static/models"

    fs.readdir(path, function(err, items) {

      for (let i=0; i < items.length; i++) {
          console.log(items[i]);
      }

    })
  }
}

export default FolderInspector;
