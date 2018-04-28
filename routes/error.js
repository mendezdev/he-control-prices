module.exports = app => {
    app.get('/error', (req, res) => res.send({ message: 'Something is wrong :('}))
}