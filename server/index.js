const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const dbUtils = require('./db/utils/index');
const userUtils = require('./db/utils/userUtils');

const port = 3040;

dbUtils.setUpConnection();
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('index');
});

app.post('/user/create', (req, res) => {
  userUtils.createUser(req.body)
    .then(respData => res.send(respData._id));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(
  port, '127.0.0.1',
  () => {
    console.log(`App listening at port ${port}`);
  },
);
