const express = require('express')
const app = express();

app.use(express.static(__dirname + '/client'))

app.get('/', (req, res) => res.send({ message: 'Welcome to HE Control Prices' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => console.log(`Listening on port ${PORT}`))