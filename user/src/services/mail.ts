import nodemailer, { SendMailOptions } from "nodemailer";
import { verifyEmailAddressTemplate } from "../email-templates/verify-email.template";
import { forgotPasswordTemplate } from "../email-templates/forgot-password.template";


export class MailService {
    // create reusable transporter object using the default SMTP transport
    private transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

    async sendEmail (mailDetails: SendMailOptions) {
        return await this.transporter.sendMail(mailDetails);
    }

    async sendEmailVerificationEmail (email: string, url: string, userName: string) {
        await this.sendEmail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Complete Your Cybershop Registration – Verify Your Email Now",
            html: verifyEmailAddressTemplate(userName, url)
        })
    }

    async sendForgotPasswordEmail (email: string, url: string, userName: string) {
        await this.sendEmail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Reset Your Cybershop Password",
            html: forgotPasswordTemplate(userName, url)
        })
    }
  
}