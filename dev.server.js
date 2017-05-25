const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const PORT = process.env.port;
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use('*', function (req, res, next) {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html').send(result).end();
  })
})
app.listen(PORT, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${PORT}/`);
});
