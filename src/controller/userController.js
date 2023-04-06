const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')

exports.loginUser = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body
        let { email, password } = data


        //Validations
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data not present" })
        if (!email) return res.status(400).send({ status: false, message: "Enter email" })
        if (!validator.isEmail(email)) return res.status(400).send({ status: false, message: "Enter valid Email" })
        if (!password) return res.status(400).send({ status: false, message: "Enter Password" })


        let checkEmail = await userModel.findOne({ email: email })

        if (!checkEmail) {
            let userData = await userModel.create(data)

            let token = jwt.sign({ userId: userData._id }, 'secret code')
            return res.status(200).send({ status: true, token: token })

        } else {
            if (checkEmail.password == password) {
                let token = jwt.sign({ userId: checkEmail._id }, 'secret code')
                return res.status(200).send({ status: true, token: token })

            } else {
                return res.status(401).send({ status: false, message: "Please Enter Correct password Or Enter diffrent email to create account" })
            }
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

exports.logutUser = async function (req, res) {

}