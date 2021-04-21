// Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
// GET /api/drive
const fs = require ('fs/promises');
const tmp = "C:\\Users\\karlo\\AppData\\Local\\Temp\\nodeTest";


function listfolder (file='') {
    //retourne une promesse sous forme de tableau pour lire le dossier avec fs.readdir
    const promise = fs.readdir(tmp+'\\'+file, {withFileTypes:true})
    //faire une promesse qui en cas de succès renvoie un tableau
    const transfpromise = promise.then((results) => {
        //création du tableau vide
        const tab =[];
        //parcours le tableau et rajoute dans celui-ci un fichier ou un dossier
        results.forEach(function(resultobj) {
            tab.push({
                name: resultobj.name,
                //pour voir si c'est un dossier on utilise isDirectory
                isFolder: resultobj.isDirectory()
            })
        })
        return tab;
    })
    return transfpromise;
}


//Retourne le contenu de {name}
function returnContent (file) {
        const promiseUn = fs.readFile(tmp+'\\'+file, {encoding:'utf-8'})
    return promiseUn;
}

function folderOrFile (file) {
    const promiseDeux = fs.stat(tmp+'\\'+file)
    return promiseDeux;
}


module.exports = {
    returnContent: returnContent,
    list: listfolder,
    folderOrFile: folderOrFile
}