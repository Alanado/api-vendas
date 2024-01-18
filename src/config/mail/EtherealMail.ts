import nodemailer from 'nodemailer';

interface ISendMail {
   to: string;
   body: string;
}

export default class EtherealMail {
   static async sendMail({ to, body }: ISendMail) {
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

      const message = await transporter.sendMail({
         from: 'alanzokabrazuca@gmail.com',
         to,
         subject: 'Redefinição de senha.',
         text: body,
      });

      console.log(`Mensagem enviada: ${message.response}`);
      console.log(
         `URL para ver caixa de entrada: ${nodemailer.getTestMessageUrl(
            message,
         )}`,
      );
   }
}
