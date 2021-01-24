const db = require('../../database')
const fs = require('fs')

class FilesRepository {
  async create({ filename, path }) {
    const [row] = await db.query(
      `
      INSERT INTO files (name, path)
      VALUES ($1, $2)
      RETURNING *
    `,
      [filename, path]
    )

    return row
  }

  async find(id) {
    const [row] = await db.query(
      `
      SELECT * FROM files
      WHERE id = $1
    `,
      [id]
    )

    return row
  }

  async delete(id) {
    const [file] = await db.query(
      `
      SELECT * FROM files
      WHERE id = $1
    `,
      [id]
    )
    fs.unlinkSync(file.path)

    const deleteOp = await db.query(
      `
      DELETE FROM files
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new FilesRepository()
