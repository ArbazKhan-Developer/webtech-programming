const data = require('../db/connection')
const Mydata = data.formdb
exports.register = async (req, res) => {
    try {
        await res.render("register")
    } catch (error) {
        console.log(error);

    }
}
exports.index = async (req, res) => {
    try {
        await res.status(200).render("index")
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.about = async (req, res) => {
    try {
        // console.log(`our cookei: ${req.cookies.jwt}`);
        
        await res.status(200).render("about")
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.service = async (req, res) => {
    try {
        await res.status(200).render("service")
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.contact = async (req, res) => {
    try {
        await res.status(200).render("contact")
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.team = async (req, res) => {
    try {
        await res.status(200).render("team")
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.postcontact = async (req, res) => {
    try {
        const data = await Mydata.create(req.body);
        // console.log(data);


        await res.status(200).render("index")

    } catch (error) {
        console.log('error accur in post contact');
        res.send(error)
    }
} 
exports.err = async(req,res)=>{
    res.render('logerr')
}