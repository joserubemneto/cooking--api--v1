const db = require('../../database')

class TagsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * from tags
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT * FROM tags
      WHERE id = $1
    `,
      [id]
    )

    return row
  }

  async findRecipes(tagId) {
    const rows = await db.query(
      `
      SELECT * from recipes
      WHERE tag_id = $1
    `,
      [tagId]
    )
    return rows
  }

  async create(name) {
    const [row] = await db.query(
      `
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *
    `,
      [name]
    )

    return row
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
      UPDATE tags
      SET name = $1
      WHERE id = $2
      RETURNING *
    `,
      [name, id]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM tags
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new TagsRepository()
