const passport = require('passport')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = mongoose.model('users')

module.exports = app => {

    app.post('/api/register', async (req, res) => {
        const existUser = User.findOne({
            username: req.body.username
        })

        if (existUser)
            return res.send({ message: 'The username is in use. Please try with other.' })

        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            res.status(200).send(newUser)
        } catch (err) {
            return res.status(500).send({ message: 'There was a problem registering the user.'})
        }        
    })

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/error'
    }))

    app.get('/api/current_user', (req, res) => {
        if (!req.user)
            return res.send(req.user)

        const user = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        }
        return res.send(user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })
}