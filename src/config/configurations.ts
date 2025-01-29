
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000, // پورت پیش‌فرض 3000
  database: {
    host: process.env.DATABASE_HOST || 'localhost', // آدرس پایگاه داده
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306, // پورت پایگاه داده
    username:process.env.DATABASE_USERNAME || 'root', // نام کاربری پایگاه داده
    password:process.env.DATABASE_PASSWORD || '', // رمز عبور پایگاه داده
    name: process.env.DATABASE || 'test', // نام پایگاه داده
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret', // کلید مخفی JWT
    expiresIn: process.env.EXPEIRES_IN || '1h', // زمان انقضای توکن
    
  },


})