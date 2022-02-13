const express = require('express');
const app = express();
const path = require('path')
const route = require('./src/controller/routeController')
const hbs = require('hbs')
const loginroute = require('./src/controller/logincontroller')
const cookieParser = require('cookie-parser')
const authenticate = require('./src/middleware/auth')

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')))
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/css', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

const partialpath = path.join(__dirname, '../tamplets/partials/')
const tampletpath = path.join(__dirname, '../tamplets/views/')
hbs.registerPartials(partialpath)

app.set("view engine", "hbs")
app.set("views", tampletpath)

app.use(express.urlencoded({ extended: false }));
app.post('/register', loginroute.register)
app.get('/home', authenticate.auth, route.index)
app.get('/about', authenticate.auth, route.about)
app.get('/service', authenticate.auth, route.service)
app.get('/contact', authenticate.auth, route.contact)
app.get('/ourteam', authenticate.auth, route.team)
app.post('/contact', authenticate.auth, route.postcontact)
app.get('/', route.register)
app.post('/login', loginroute.login)
app.get('/logout', authenticate.auth, authenticate.logout)
app.all('*', route.err)


module.exports = app



