export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-arch-api',
  PORT: process.env.PORT ?? 5050
}
