const http = require('http');
require('dotenv').config()
const app = require('./backend/app');
const PORT = process.env.PORT || 3000;

app.set('PORT', PORT)
const server = http.createServer((req, res) => {
  res.end('This is my first response!')
});

server.listen(() => {
  console.log(`Listening on PORT: ${PORT}`)
})

