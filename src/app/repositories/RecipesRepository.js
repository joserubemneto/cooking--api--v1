const db = require('../../database')

class RecipesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT * FROM recipes
      ORDER BY title ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM recipes
      WHERE id = $1
    `, [id])

    return row
  }

  async create({ title, ingredients, preparation, information }) {
    const [row] = await db.query(`
      INSERT INTO recipes (title, ingredients, preparation, information)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [title, ingredients, preparation, information])

    return row
  }
}

module.exports = new RecipesRepository()
