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


app.post('/api/users', (req, res) => {
  //console.log(req.body)
  let { username } = req.body;
  let newUser = new User({ username: username })
  newUser.save((error, savedUser) => {
    if (!error) {
      let responseObject = {}
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
  let { _id } = req.params;
  console.log(description, duration, date, _id )
  if (!date) {
    date = new Date().toISOString().substring(0, 10);
  }
  let newSession = new Session({
    description: description,
    duration: parseInt(duration),
    date: date,
  })
  
  User.findByIdAndUpdate(
    _id,
    { $push: { log: newSession } },
    { new: true },
    (error, updatedUser) => {
      if (!error && updatedUser) {
        let responseObject = {}
        let { username, _id } = updatedUser
        let { description, duration, date } = newSession;
        
        responseObject['username'] = username;
        responseObject['description'] = description;
        responseObject['duration'] = duration;
        responseObject['date'] = new Date(date).toDateString();
        responseObject['_id'] = _id
        return res.json(responseObject)
      } else {
        return res.json({
          error: 'user not found'
        })
      }
    }
  )
  //console.log(_id)
  //res.json({ hola: newSession.description })
})

app.get('/api/users/:_id/logs', (req, res) => {
  let { _id: id } = req.params
  //console.log(id)
  User.findById(
    id,
    (error, user) => {
      if (!error && user) {
        let responseObject = {}
        let count = user.log.length
        let { username, _id, log } = user;
        responseObject['_id'] = _id;
        responseObject['username'] = username;
        responseObject['count'] = count;
        responseObject['log'] = log.map(item => {
          let date = new Date(item.date).toDateString();
          if (date == 'Invalid Date') {
            date = new Date().toDateString()
          }
          item['date'] = date
          return item
        })
        if (req.query.limit) {
          responseObject.log = responseObject.log.slice(0, req.query.limit);
        }
        if (req.query.from || req.query.to) {
          let fromDate = new Date(0);
          let toDate = new Date()

          if (req.query.from) {
            fromDate = new Date(req.query.from);
          }
          if (req.query.to) {
            toDate = new Date(req.query.to)
          }

          fromDate = fromDate.getTime()
          toDate = toDate.getTime()

          responseObject.log = responseObject.log.filter(session => {
            let sessionDate = new Date(session.date).getTime()

            return sessionDate >= fromDate && sessionDate <= toDate;
          })
        }
        return res.json(responseObject)
      }
    }
  )
  //res.json({})
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
