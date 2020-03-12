const express           = require('express');
const path              = require('path');
const next              = require('next');
const mongoose          = require('mongoose');
const routes            = require('../routes');
const dev               = process.env.NODE_ENV !== 'production';
const app               = next({dev});
const handle            = routes.getRequestHandler(app);
const config            = require('./config');

const bodyParser        = require('body-parser');
//SERVICES
const authService       = require('./services/auth');
const bookRoutes        = require('./routes/book');
const portfolioRoutes   = require('./routes/portfolios');
const blogRoutes        = require('./routes/blog');

const robotsOption      = {
    root: path.join(__dirname, '../static'),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
}
const secretData        = [
    {
        title: 'secret data 1',
        description: 'lets kill donald trump'
    },
    {
        title: 'secret data 2',
        description: 'psichedelycs are good'
    }
]

mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('Database Connected!'))
    .catch(err=>console.log(err));

app.prepare()
.then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use('/api/v1/books', bookRoutes);
    server.use('/api/v1/portfolios', portfolioRoutes);
    server.use('/api/v1/blogs', blogRoutes);

    server.get('/robots.txt', (req, res) => {
        return res.status(200).sendFile('robots.txt', robotsOption);
    })

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
         return res.json(secretData);
    });

    server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
        return res.json(secretData);
   });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access! '});
        }
    });

    server.use(handle).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})