const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Blog } = require('../models/Blog');
const { Comment } = require('../models/Comment');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const blogs = await Blog.getAll();
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const blog = await Blog.getById(req.params.id);
      await blog.addComments();
      res.json(blog);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/comments', authenticate, async (req, res, next) => {
    try {
      // create a new comment
      const comment = await Comment.insert({
        blogId: req.params.id,
        userId: req.user.id,
        detail: req.body.detail,
      });
      // return the comment in the response
      res.json(comment);
    } catch (e) {
      next(e);
    }
  });
