const express = require('express');
const { ifAlphanumerique } = require('./drive');
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
    })
    .catch(() => {
      res.status(404).send("le dossier n'existe pas!")
    });
});

//Créer un dossier avec le nom {name}
app.post('/api/drive', function (req, res) {
  if (drive.ifAlphanumerique(req.query.name)) {
    drive.createFolder(req.query.name)
      .then((result) => {
        res.send(result);
      })
  } else {
    res.status(404).send("erreur d'écriture!")
  }
})

//Créer un dossier avec le nom {name} dans {folder}
app.post('/api/drive/:folder', function (req, res) {
  if (drive.ifAlphanumerique(req.query.name)) {
    drive.createFolderInFolder(req.params.folder, req.query.name)
      .then((result) => {
        res.send(result);
      })
  } else {
    res.status(404).send("erreur d'écriture!")
  }
})

//Suppression d’un dossier ou d’un fichier avec le nom {name}
app.delete('/api/drive/:name', function (req, res) {
  if (drive.ifAlphanumerique(req.params.name)) {
    drive.folderOrFile(req.params.name)
      .then((stats) => {
        if (stats.isDirectory()) {
          drive.deleteFolder(req.params.name)
            .then((result) => {
              res.send(result);
            });
        } else {
          drive.deleteFile(req.params.name)
            .then((stats) => {
              res.send(stats);
            });
        }
      })
      .catch(() => {
        res.status(404).send("dommage!")
      });
  } else {
    res.status(400).send("alphanumerique n'est pas passé")
  }
});

//Suppression d’un dossier ou d’un fichier avec le nom {name} dans {folder}
app.delete('/api/drive/:folder/:name', function (req, res) {
  console.log(req.params.name)
  if (drive.ifAlphanumerique(req.params.name)) {
    drive.folderOrFile(req.params.name, req.params.folder)
      .then((stats) => {
        if (stats.isDirectory()) {
          drive.deleteFolderInFolder(req.params.folder, req.params.name)
            .then((result) => {
              res.send(result);
            });
        } else {
          drive.deleteFileInFile(req.params.folder, req.params.name)
            .then((stats) => {
              res.send(stats);
            });
        }
      })
      .catch(() => {
        res.status(404).send("dommage!")
      });
  } else {
    res.status(400).send("alphanumerique n'est pas passé")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})