/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    MONGO_URI:
      'mongodb+srv://michel123:michel123@cluster0-4ozhd.mongodb.net/zombie-app?retryWrites=true&w=majority',
  },
}
