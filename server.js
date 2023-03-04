const http = require('http');
require('dotenv').config()
const app = require('./backend/app');
const PORT = process.env.PORT || 3000;

app.set('port', PORT)

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})

