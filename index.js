const express = require('express')
const app = express();

app.get('/', (req, res) => res.send({ message: 'Welcome to HE Control Prices' }))

const PORT = process.env.PORT || 3000
app.listen(3000, (req, res) => console.log(`Listening on port ${PORT}`))