import nodemailer, { SendMailOptions } from "nodemailer";


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
}