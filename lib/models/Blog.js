const pool = require('../utils/pool');
const { Comment } = require('./Comment');

class Blog {
  id;
  title;
  body;
  comments;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from blogs;');
    return rows.map((row) => new Blog(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from blogs WHERE id = $1;', [
      id,
    ]);
    if (!rows) return null;
    return new Blog(rows[0]);
  }
  // not a static function because it runs on the actual instance object of the class
  async addComments() {
    const { rows } = await pool.query(
      'SELECT * from comments where blog_id = $1',
      [this.id]
    );
    // addComments is grabbing all comments associated with the blog (this.id) it is called on, maps over any comments posted to the specific blog, & creates a new comment for each of the comments that exists and attaches the new comment as an instance variable (i.e. "this blog's comments (this.id) are now going to be equal to this list of comments (new Comment(row))).
    this.comments = rows.map((row) => new Comment(row));
  }
}

module.exports = { Blog };

// Blog.getAll()
// const blog = new Blog({id: 1, title: 'blah', body: 'blah blah'})
// blog.addComments();
