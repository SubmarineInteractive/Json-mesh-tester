import path from 'path'
import fs from 'fs'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.babel.js'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 4000 : process.env.PORT
const ip = 'localhost'

const app = express()
const compiler = webpack( config )

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

app.route('/api/v1/meshes')
  .get(function(req, res) {
    const meshesPath = './static/models/'
    let meshesList = [];

    fs.readdir(meshesPath, (err, items) => {

      for (let i = 0; i < items.length; i++) {
        if(items[i].endsWith(".json")) {
          meshesList.push(items[i])
        }
      }

      res.send(JSON.stringify(meshesList));

    })
  })


app.listen( port, ip, error => {
  if (error) throw error

  console.info(`=> 🚧 Listening on port ${port}. Open up http://${ip}:${port}/ in your browser.`)
})
