import path from 'path'
import fs from 'fs'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config.babel'
import upload from './helpers/multer'
import getMesh from './getMesh'


const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 4000 : process.env.PORT
const ip = 'localhost'

const app = express()
const compiler = webpack( config )

const MODEL_FOLDER = './static/models/'

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))


/**
 * Get meshes list
 */
app.get('/api/v1/mesh', getMesh);

/**
 * Post mesh from form
 */
// app.post('/api/v1/mesh', postMesh);


/**
 * Get meshes list
 */
app.post('/api/v1/mesh', upload.single('mesh'), (req, res, next)=> {
  console.log('hey mais ta race ?')
});



app.listen( port, ip, error => {
  if (error) throw error

  console.info(`=> 🚧 Listening on port ${port}. Open up http://${ip}:${port}/ in your browser.`)
})
