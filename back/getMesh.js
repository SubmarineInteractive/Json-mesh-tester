import fs from 'fs'

export default function(req, res) {

const meshesPath = './static/models/'

  let meshesList = []

  fs.readdir(meshesPath, (err, items) => {

      for (let i = 0; i < items.length; i++) {
        if(items[i].endsWith(".json")) {
          meshesList.push(items[i])
        }
      }

    res.send(JSON.stringify(meshesList))

  })
}
