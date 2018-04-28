const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const keys = require('./config/keys')
const app = express();

require('./models/User')
require('./services/passport')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieSecret]
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/error')(app)

app.use(express.static(__dirname + '/client'))

app.get('/', (req, res) => res.send({ message: 'Welcome to HE Control Prices' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => console.log(`Listening on port ${PORT}`))