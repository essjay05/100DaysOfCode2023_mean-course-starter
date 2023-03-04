const http = require('http');
require('dotenv').config()
const app = require('./backend/app');
const debug = require('debug')('node-angular')


// normalize PORT
const normalizePort = val => {
  const PORT = parseInt(val, 10)

  if (isNaN(PORT)) {
    // named pipe
    return val
  }
  if (PORT >= 0) {
    return PORT
  }

  return false
}

// error handling
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'PORT' + PORT
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break;
    default:
      throw error;
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe:' + addr : 'PORT:' + PORT
  debug('Listening on ' + bind)
}

const PORT = normalizePort(process.env.PORT || 3000);
app.set('port', PORT)

const server = http.createServer(app);
server.on('error', onError)
server.on('listening', onListening)
server.listen(PORT)

