require('dotenv').config({ path: '../config.env' })
const jwt = require('jsonwebtoken')
const Credential = require('../db/connection')
const db = Credential.logindb



exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const uservarify = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(`token varify successfully ${JSON.stringify(uservarify)}`);
        const user = await db.findOne({ _id: uservarify._id })
        req.user = user;
        if (uservarify) {
            next();
        } else {
            console.log('token varification failed');
            res.send('varification failed')
        }

    } catch (error) {
        res.render('logerr')
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        console.log('logout successfully');
        await req.user.save()
        await res.status(200).render("register")
    } catch (error) {

    }
}
