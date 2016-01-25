import fs from 'fs'
import multer from 'multer'

const PATH = './static/models/'

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, PATH)
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname)
  }
})

export default multer({
  storage: storage,
  fileFilter: (req, file, callback) => {

    if (file.mimetype === 'application/json') {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: {
    fieldSize: 10000000
  }
})
