const express = require('express')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()

const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(cors())
app.use(routes)
app.use((error, request, response, next) => {
  console.log(error)
  response.sendStatus(500)
})

app.listen(3000, () =>
  console.log('Server is running on port http://localhost:3000')
)
