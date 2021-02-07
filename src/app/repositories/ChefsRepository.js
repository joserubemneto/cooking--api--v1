const db = require('../../database')

class ChefsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT chefs.*, count(recipes.id) AS recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY (chefs.id, chefs.name, chefs.resume, chefs.img_url)
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
      GROUP BY (chefs.id, chefs.name, chefs.resume, chefs.img_url)
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

  async create({ name, resume, img_url }) {
    const [row] = await db.query(
      `
      INSERT INTO chefs (name, resume, img_url)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [name, resume, img_url]
    )

    return row
  }

  async update(id, { name, resume, img_url }) {
    const [row] = await db.query(
      `
      UPDATE chefs
      SET name = $1,
      resume = $2,
      img_url = $3
      WHERE id = $4
      RETURNING *
    `,
      [name, resume, img_url, id]
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
