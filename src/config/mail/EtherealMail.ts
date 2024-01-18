import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariables {
   [key: string]: string | number;
}

interface IParseMail {
   template: string;
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

export default class EtherealMail {
   static async sendMail({ to, subject, template, from }: ISendMail) {
      const account = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
         host: account.smtp.host,
         port: account.smtp.port,
         secure: account.smtp.secure,
         auth: {
            user: account.user,
            pass: account.pass,
         },
      });

      const mailTemplate = new HandlebarsMailTemplate();

      const message = await transporter.sendMail({
         from: {
            name: from?.name || 'Alanzoka Top One',
            address: from?.email || 'alanzokabrazuca@gmail.com',
         },
         to: {
            name: to.name,
            address: to.email,
         },
         subject,
         html: await mailTemplate.parse(template),
      });

      console.log(`Mensagem enviada: ${message.response}`);
      console.log(
         `URL para ver caixa de entrada: ${nodemailer.getTestMessageUrl(
            message,
         )}`,
      );
   }
}
