import nodemailer, { SendMailOptions } from "nodemailer";
import { verifyEmailAddressTemplate } from "../email-templates/verify-email.template";
import { forgotPasswordTemplate } from "../email-templates/forgot-password.template";
import { inviteMemberTemplate } from "../email-templates/invite-member.template";
import { base64Encode } from "../utils";
import { FrontendRoutes } from "../enums/frontend-routes";


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

    async sendEmail(mailDetails: SendMailOptions) {
        return await this.transporter.sendMail(mailDetails);
    }

    async sendEmailVerificationEmail({email, host, token, userName}: {
        email: string, host: string, token: string, userName: string
    }) {
        await this.sendEmail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Complete Your Cybershop Registration – Verify Your Email Now",
            html: verifyEmailAddressTemplate(userName, `${host}/${FrontendRoutes.VERIFY_EMAIL}/${token}`)
        })
    }

    async sendForgotPasswordEmail({email, host, token, userName}: {
        email: string, host: string, token: string, userName: string
    }) {
        await this.sendEmail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Reset Your Cybershop Password",
            html: forgotPasswordTemplate(userName, `${host}/${FrontendRoutes.FORGOT_PASSWORD}/${token}`)
        })
    }

    async sendInviteMemberEmail({ email, host, userName }: { email: string, host: string, userName: string }) {
        await this.sendEmail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "You're Invited to Join Cybershop!",
            html: inviteMemberTemplate(userName, `${host}/${FrontendRoutes.INVITE_MEMBER}?invitation=${base64Encode(email)}`)
        })
    }

}