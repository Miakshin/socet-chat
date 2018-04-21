const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const port = 3040;

app.options('*', cors());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.end("index")
// });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(
  port, '127.0.0.1',
  () => {
    console.log(`App listening at port ${port}`);
  },
);
