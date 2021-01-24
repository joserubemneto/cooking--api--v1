const db = require('../../database')

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const rows = await db.query(`
      SELECT categories.*, count(recipes.id) AS recipes
      FROM categories
      LEFT JOIN recipes ON recipes.category_id = categories.id
      GROUP BY (categories.id, categories.name, categories.file_id)
      ORDER BY name ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT categories.*, count(recipes.id) as recipes
      FROM categories
      LEFT JOIN recipes ON recipes.category_id = categories.id
      WHERE categories.id = $1
      GROUP BY (categories.id, categories.name, categories.file_id)
    `,
      [id]
    )

    return row
  }

  async findByName(name) {
    const [row] = await db.query(
      `
      SELECT * FROM categories
      WHERE name = $1
    `,
      [name]
    )

    return row
  }

  async create({ name, file_id }) {
    const [row] = await db.query(
      `
      INSERT INTO categories (name, file_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [name, file_id]
    )

    return row
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
      UPDATE categories
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
      DELETE FROM categories
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new CategoriesRepository()
