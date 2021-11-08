require('dotenv').config()
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async(req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    // mongoose validation
    // joi
    // check in controller
    if(!username || !password) {
        throw new CustomAPIError('please provide email and password', 400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d',})
    res.status(200).json({msg: 'user created', token: token})
}

const dashboard = async(req, res) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('NO token provided', 401)
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({msg: `Hello, ${decoded.username}`, secret: `Here's your secret number ${luckyNumber}`, token})
    } catch (err) {
        throw new CustomAPIError('Not authorised to use this route', 401)
    }
    
}

module.exports = {
    login,
    dashboard
}