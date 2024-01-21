const jwt = {
   secret: process.env.APP_SECRET as string,
   expiresIn: '8h',
};

export default jwt;
