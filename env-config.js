const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://portfolio-app-boilerplate.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://portfolio-app-boilerplate.herokuapp.com',
    'process.env.CLIENT_ID': 'jSlIZnwQWSy7otp4bxd40GLJHiTUoN6I'
}