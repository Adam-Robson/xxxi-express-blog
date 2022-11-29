const pool = require('../utils/pool');

class Comment {
  id;
  user_id;
  blog_id;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.detail = row.detail;
  }

  static async insert({ blogId, userId, detail }) {
    const { rows } = await pool.query(
      'INSERT INTO comments (blog_id, user_id, detail) VALUES ($1, $2, $3) RETURNING *',
      [blogId, userId, detail]
    );
    return new Comment(rows[0]);
  }
}

module.exports = { Comment };
