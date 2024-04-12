const  express = require('express');
const app = express();
const port =5000;

require("dotenv").config();

const bodyParser = require("express").json;
app.use(bodyParser());

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    uath:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

transporter.verify((error, success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success);
    }
});

app.post("sendmail", (re,res)=>{
    const{from, subject, message} =reeq.body;

    const mailOptions = {
        from: from,
        to: process.env.AUTH_EMAIL,
        subject:subject,
        text:message
    }

    transporter
    .sendMail(mailOptions)
    .then(() => {
        res.json({
            status: "success", message: "Message sent"
        })
    })
    .catch((error) => {
        console.log(error);
        res.json({status: "FAILED", message: "An error occured!"})
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})