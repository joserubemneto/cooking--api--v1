const db = require('../../database')

class ChefsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT chefs.*, count(recipes.id) AS recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY (chefs.id, chefs.name, chefs.resume)
      ORDER BY name ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT chefs.*, count(recipes.id) AS recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY (chefs.id, chefs.name, chefs.resume)
    `,
      [id]
    )

    return row
  }

  async findRecipes(id) {
    const rows = await db.query(
      `
      SELECT * FROM recipes
      WHERE chef_id = $1
    `,
      [id]
    )

    return rows
  }

  async create({ name, resume }) {
    const [row] = await db.query(
      `
      INSERT INTO chefs (name, resume)
      VALUES ($1, $2)
      RETURNING *
    `,
      [name, resume]
    )

    return row
  }

  async update(id, { name, resume }) {
    const [row] = await db.query(
      `
      UPDATE chefs
      SET name = $1,
      resume = $2
      WHERE id = $3
      RETURNING *
    `,
      [name, resume, id]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM chefs
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new ChefsRepository()
