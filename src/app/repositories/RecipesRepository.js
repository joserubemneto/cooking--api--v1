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

  async update(id, { title, ingredients, preparation, information }) {
    const [row] = await db.query(`
      UPDATE recipes
      SET title = $1,
      ingredients = $2,
      preparation = $3,
      information = $4
      WHERE id = $5
      RETURNING *
    `, [title, ingredients, preparation, information, id])

    return row
  }
}

module.exports = new RecipesRepository()
