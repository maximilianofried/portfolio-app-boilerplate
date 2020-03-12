const routes = require('next-routes');

module.exports = routes()
.add('test', '/test/:id')
.add('portfolio', '/portfolio/:id')
.add('portfolioEdit', '/portfolios/:id/edit')
.add('blogEditor', '/blogs/new')
.add('userBlogs', '/blogs/dashboard')
.add('blogDetail', '/blogs/:slug')
.add('blogEditorUpdate', '/blogs/:id/edit');

