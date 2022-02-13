require('dotenv').config({ path: '../config.env' })
const Credential = require('../db/connection')
const getapp = require('../app')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')

const db = Credential.logindb
exports.register = async (req, res) => {
    try {
        let password = req.body.password
        let confirm_password = req.body.confirm_password

        let encryptPass = await bcrypt.hash(password, 10)
        // console.log(encryptPass);

        let encryptConfirm_pass = await bcrypt.hash(confirm_password, 10)
        // console.log(encryptConfirm_pass);

        let compare_password = await bcrypt.compare(confirm_password, encryptPass);
        // console.log(compare_password);

        const filepath = path.join(__dirname, '../../tamplets/views/index.hbs')
        let content = await fs.readFileSync(filepath, 'utf8')


        if (compare_password) {
            let data = await new db({
                username: req.body.username,
                useremail: req.body.useremail,
                password: encryptPass,
                confirm_password: encryptConfirm_pass
            });
            // console.log(data._id);
            const gettoken = await jwt.sign({ _id: data._id }, process.env.SECRET_KEY)
            // console.log(`gettoken: ${gettoken}`);
            await Object.assign(data, { token: gettoken });
            await data.save()
            res.cookie("jwt", gettoken)
            // await getapp.execute()
            // console.log(data);
            let username = await data.username;
            let result = await content.replace(/<a class="nav-link" id="text">(.*)<\/a>/g, '<a class="nav-link" id="text">' + username + '</a>');
            await fs.writeFile(filepath, result,'utf8',(err,data)=>{
                execute(data);
            })
           function execute(data) {
            res.status(200).render("index")
           }
            await res.status(200).render("index")
        } else {
            console.log("password not matching");
            res.status(400).json({
                status: "password not maching"
            })
        }
    } catch (error) {
        // console.log('error accur in login contact');
        // console.log(error)
        res.send(error)
    }
}

exports.login = async (req, res) => {
    try {
        const email = await req.body.loginemail
        const pass = await req.body.loginpassword
        // console.log(pass);

        const regemail = await db.findOne({ useremail: email })
        // console.log(regemail);
        const logtoken = await jwt.sign({ _id: regemail._id }, process.env.SECRET_KEY)
        // console.log(logtoken);
        const logpassword = await regemail.password

        // console.log(logpassword);
        let comp_password = await bcrypt.compare(pass, logpassword);
        // console.log(comp_password);
        const filepath = path.join(__dirname, '../../tamplets/views/index.hbs')
        // console.log(filepath);
        let data = await fs.readFileSync(filepath, 'utf8')
        // console.log(data);
        

        if (comp_password) {
            console.log('logged in');
            res.cookie("jwt", logtoken)
            let Logout;
            let result = await data.replace(/<a class="nav-link" id="text" (.*)>(.*)<\/a>/g, '<a class="nav-link" id="text"'+ `href="logout"`+'>' + 'Logout' + '</a>');
            
            await fs.writeFile(filepath, result,'utf8',()=>{
                execute();
            })
           function execute(data) {
            res.status(200).render("index")
           }
            
        } else {
            res.status(400).send("invalid credentials")
        }
    } catch (error) {
        res.status(400).send("invalid credentials")
        // console.log(error);

    }
}

