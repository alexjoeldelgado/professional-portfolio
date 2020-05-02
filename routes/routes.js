var portObjects = require("./portObjects");
require("dotenv").config();
var nodemailer = require('nodemailer');

module.exports = function(app) {
    app.get("/", function(req, res) {
      res.render("home");
    });
  
    app.get("/about", function(req, res) {
      res.render("about");
    });
  
    app.get("/portfolio", function(req, res) {
        var po = {
            data: portObjects
        };
        res.render("portfolio", po); 
    });
    
    app.get("/resume", function(req, res) {
      res.render("resume")
    });
    
    app.get("/contact", function(req, res) {
        res.render("contact");
    });

    app.post("/api/messages", function(req, res) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: `${process.env.MAILEMAIL}`,
          pass: `${process.env.MAILPASSWORD}`
        }
      });

      const mailOptions = {
        from: `${req.body.email}`,
        to: `${process.env.MAILEMAIL}`,
        subject: `Contact Form Submission from ${req.body.name}`,
        text: 
        `
        Name: ${req.body.name}
        Email: ${req.body.email}  
        Message: ${req.body.message}
        ` 
      };
          
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(req.body);
    });
};