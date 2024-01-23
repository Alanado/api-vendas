interface IMailConfig {
   driver: 'ethereal' | 'mailtrap';
   defaults: {
      from: {
         name: string;
         email: string;
      };
   };
}

export default {
   driver: process.env.MAIL_DRIVER || 'ethereal',
   defaults: {
      from: {
         name: 'Alan Gabriel',
         email: 'contatoapivendas@gmail.com',
      },
   },
} as IMailConfig;
