import nodemailer from "nodemailer";
import { GMAIL_USERNAME, GMAIL_PASSWORD } from '../config/index';


const sendMailGmail = async (body: string, to: string[], subject?: string) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: GMAIL_USERNAME, // generated ethereal user
            pass: GMAIL_PASSWORD, // generated ethereal password
        },
    });
    const recipients: string = to.toString();
    let mailOptions = {
        from: '"ERMS" <noreply@myERMS.com>',
        to: recipients,
        subject: (subject) ? subject : "New mail from myERMS",
        generateTextFromHTML: true,
        html: body,
    };
    let info = await transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {           
            // console.error({success: false, existing:false, sendError: true});
            console.error(error)
        }
                    // return info;
        else{

            // console.info({success:true, existing:false, sendError: false});
            console.log("Code sent to: %s", recipients + info.response)
            // console.info("Message sent: %s", info.response);
        }

    });
    return info

};
export const sendPasswordReset = (code: string, user: any) => {
    const message =
        `<h3>Hi ${user.username},</h3>
        <p>Here's the password reset code you requested: <strong>${code}</strong></p>
        <p>If you believe you did this in error, please ignore this email.</p>
        `;
    return sendMailGmail(message, [user.email], "Password Reset Code").then((data) => {
        return "success";
    });
 
};

