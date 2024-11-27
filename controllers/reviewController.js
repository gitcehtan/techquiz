require("dotenv").config();
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });
  

const reviewForm = async(req,res) => {
   
    try {

         // Get the user's IP address from the request
        const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('User IP:', userIp);

        // Save the IP address along with form data in your database
        const formData = req.body;
        formData.ip = userIp;

        // Example: Respond with success
        res.status(200).send('Form submitted successfully');

       
        if (!formData.userName || !formData.userReview) {
          return res.status(400).semd("Username and User Review are required!");
        } 
   

       
        const htmlMessage = `
        <h2>Message Sent by User</h2>
        <br/>
        UserName: ${formData.userName}
        <br/>
        Review: ${formData.userReview}
        <br/>
        IP: ${formData.ip}
        ` 
       
         var mailOptions = {
           from: process.env.SMTP_MAIL,
           to: process.env.TO_MAIL,
           subject: "TECHQUIZ Review Mails ",
           html: htmlMessage,
         };
       
         transporter.sendMail(mailOptions, function (error, info) {
           if (error) {
             console.log("ERROR "+error);
             
             return res.status(400).send("Error while sending review");
           }
               res.status(200).send("Review Sent !");
           
           
         });
        
        } catch (error) {
        res.status(500).send("Internal Server Error")
    }

   
    
}


module.exports = {reviewForm};