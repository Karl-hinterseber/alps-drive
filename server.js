const express = require('express')
const drive = require('./drive')
const app = express()
const port = 3000

// La fonction est exécutée pour tout type de demande HTTP sur le dossier du nom frontend
app.use('/', express.static(__dirname + '/frontend'));


//méthode de routage. Ce chemin de routage fera correspondre des demandes à /api/drive.
app.get('/api/drive', (req, res) => {
  drive.list()
    .then((result) => {
      res.send(result);
    })
});

//Retourne le contenu de {name}
//rep.params.name veut dire que l'on récupère la valeure dans le chemin dans le paramètre
app.get('/api/drive/:name', function (req, res) {
  drive.folderOrFile(req.params.name)
    .then((stats) => {
      if (stats.isDirectory()) {
        drive.list(req.params.name)
          .then((result) => {
            res.send(result);
          });
      } else {
        drive.returnContent(req.params.name)
          .then((data) => {
            res.send(data);
          });
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})