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

app.post('/user/check-login', (req, res) => {
  userUtils.checkUserMatch(req.body)
    .then(answer => res.send(answer));
});

app.post('/user/add-to-fiends', (req,res) => {
  addToFriedns(req.body.userId, req.body.target)
    .then(answer => res.send(answer))
})

io.on('connection', (socket) => {
  let user = socket.handshake.query.user;
  socket.on('user joined', (name) => {
    io.emit('user joined', name);
  });
  socket.on('chat message', (msgObj) => {
    io.emit('chat message', msgObj);
  });
  socket.on('user disconnect', (userName) =>{
    console.log(userName);
    io.emit('user disconnect', userName);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
})

http.listen(
  port, '127.0.0.1',
  () => {
    console.log(`App listening at port ${port}`);
  },
);
