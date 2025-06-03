const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('newcontent')
})
app.get('/api', (req, res) => {
  res.send('hello api ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
