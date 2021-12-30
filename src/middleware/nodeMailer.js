const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = (mailId, link) => {
  let response = {
    success: true,
    message: "",
    data: "",
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: mailId,
    subject: "Reset password request",
    //text: `Hi,Here is the link to reset password" +"Click here"+"Thanks`
    html: ` <div class="reset_password">
    <p>Hi!</p>
    <p>Here is the link to reset password: <a href=${link} target="_blank"> click here</a></p>
    <p>Thanks</p>
    </div>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully", info.response);
      (response.success = true), (response.message = "Email Sent Successfully");
      (response.data = info.response), (response.status = 200);
      return response;
    }
  });
};
