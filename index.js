const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.PW, { useNewUrlParser: true }, { useUnifiedTopology: true });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))
//no puede ser
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let exerciseSessionSchema = mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String
})

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSessionSchema]
})

let Session = mongoose.model('Session', exerciseSessionSchema);
let User = mongoose.model('User', userSchema);

let responseObject = {}
app.post('/api/users', (req, res) => {
  //console.log(req.body)
  let { username } = req.body;
  let newUser = new User({ username: username })
  newUser.save((error, savedUser) => {
    if (!error) {
      responseObject['username'] = savedUser.username;
      responseObject['_id'] = savedUser.id
      res.json(responseObject)
    }
  })
  
})
app.get('/api/users', (req, res) => {
  User.find({}, (error, arrayOfUsers) => {
    res.json(arrayOfUsers);
  })
})
app.post('/api/users/:_id/exercises', (req, res) => {
  let { description, duration, date } = req.body
  console.log(description, duration, date)
  let newSession = new Session({
    description: parseInt(description),
    duration: duration,
    date: date,
  })
  res.json({ hola: newSession.description })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
