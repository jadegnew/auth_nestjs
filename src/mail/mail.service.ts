import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ToDo List ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>To activate your account, please, follow the link: </h1>
                    <a href="http://${process.env.HOST}/activate/${link}">ACTIVATE</a>
                </div>
                `
        });
    }
}
