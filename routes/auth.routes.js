const { Router } = require('express')
const { check, validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password, min 6 length').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data on register"
                })
            }

            const { email, password } = req.body
            const canditate = await User.findOne({ email })
            if (canditate) {
                return res.status(400).json({ message: `User with email ${ email } exists` })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()
            res.status(201).json({ message: "User created" })
        } catch (e) {
            res.status(500).json({ message: "Register error" })
        }
    })

router.post('/login',
    [
        check('email', 'Input the correct email').normalizeEmail().isEmail(),
        check('password', 'Input the correct password').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data on login"
            })
        }

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwt_secret'),
            { expiresIn: "1h" }
        )

        res.json({ token, userId: user.id })

    })

module.exports = router