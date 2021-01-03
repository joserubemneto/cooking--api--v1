require('dotenv').config()

const { Client } = require('pg')

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB } = process.env

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB,
  ssl: true,
})

client.connect()

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}
