const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Salut Bistrita!')
})

app.listen(port, () => {
  console.log(`Ruleaza server pe port ${port}`)
})