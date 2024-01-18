import nodemailer from "nodemailer"

interface ISendMail {
   to: string;
   body: string;
}

export default class EtherealMail {
   static async sendMail({ to, body }: ISendMail) {
      const account =
   }
}
