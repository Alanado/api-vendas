import nodemailer from 'nodemailer';
import mailConfig from '@config/mail/mail';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariables {
   [key: string]: string | number;
}

interface IParseMail {
   file: string;
   variables: ITemplateVariables;
}

interface IMailContact {
   name: string;
   email: string;
}

interface ISendMail {
   from?: IMailContact;
   to: IMailContact;
   subject: string;
   template: IParseMail;
}

export default class Mailtrap {
   static async sendMail({ to, subject, template, from }: ISendMail) {
      const transporter = nodemailer.createTransport({
         host: process.env.MAIL_HOST,
         port: Number(process.env.MAIL_PORT),
         auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         },
      });

      const mailTemplate = new HandlebarsMailTemplate();

      const { name, email } = mailConfig.defaults.from;

      const message = await transporter.sendMail({
         from: {
            name: from?.name || name,
            address: from?.email || email,
         },
         to: {
            name: to.name,
            address: to.email,
         },
         subject,
         html: await mailTemplate.parse(template),
      });
   }
}
