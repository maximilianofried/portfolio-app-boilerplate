const Blog = require('../models/blog');
const slugify = require('slugify');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getBlogs = (req, res) => {
    Blog.find({status: 'published'})
        .sort({'createdAt': -1})
        .exec((err, publishedBlogs) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(publishedBlogs);
    });
}

exports.getBlogBySlug = (req, res) => {
    const slug = req.params.slug;

    Blog.findOne({slug}, (err, foundBlog) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(foundBlog);
    })
}

exports.createBlog = (req, res) => {
    const lockId = req.query.lockId;

    if(!lock.isBusy(lockId)) {
        lock.acquire(lockId, (done) => {

            const blogData  = req.body;
            const user      = req.user;
            const blog = new Blog(blogData);
            if(user) {
                blog.userId = user.sub;
                blog.author = user.name;
            }
            blog.save((err, createdBlog) =>{
                setTimeout(() => done(), 2500);
                if(err) {
                    return res.status(422).send(err);
                }
                return res.json(createdBlog);
            })
        }, (err, ret) => {
            err && console.error(err);
        });
    } else {
        return res.status(422).send({message: 'Blog is saving!'});
    }
};

exports.updateBlog = (req, res) => {
    const blogId = req.params.id;
    const blogData = req.body;
    Blog.findById(blogId, (err, foundBlog) => {
        if(err) {
            return res.status(422).send(err);
        }

        if(blogData.status && blogData.status === 'published' && !foundBlog.slug) {
            foundBlog.slug = slugify(foundBlog.title, {
                                        replacement: '-',
                                        remove: null,
                                        lower: true
                                    });
        }

        foundBlog.set(blogData);
        foundBlog.updatedAt = new Date();
        foundBlog.save((err, foundBlog) => {
            if(err) {
                return res.status(422).send(err);
            }
        return res.json(foundBlog);
        });
    });
}

exports.getBlogById = (req, res) => {
    const blogId = req.params.id;

    Blog.findById(blogId)
        .select('-__v')
        .exec((err, foundBlog) => {
            if(err) {
                return res.status(422).send(err);
            }
            return res.json(foundBlog);
    });
}

exports.getUserBlog = (req, res) => {
    const userId = req.user.sub;

    Blog.find({userId}, (err, userBlogs) => {
        if(err) {
            return res.status(422).send(err);
        }
        return res.json(userBlogs);
    })
}

exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;

    Blog.deleteOne({_id: blogId}, (err) => {
        if(err) {
            return res.status(422).send(err);
        }

        res.json({status: 'deleted'});
    });
}