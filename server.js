const express = require('express')
const drive = require('./drive')
const app = express()
const port = 3000

app.use('/', express.static(__dirname + '/frontend'));
app.get('/api/drive', (req, res) => {
  drive.list()
    .then((result) => {
      res.send(result);
    })
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})