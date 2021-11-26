const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./server/routes/user.routes')


mongoose.connect(process.env.PW, { useNewUrlParser: true }, { useUnifiedTopology: true });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client/public'))
//no puede ser

app.get('/', (_:any, res:any) => {
  res.sendFile(__dirname + '/client/views/index.html')
});

// mount routes
app.use('/', userRoutes)

let port = process.env.PORT || 3000
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
