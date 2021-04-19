// Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
// GET /api/drive
const fs = require ('fs/promises');
const tmp = "C:\\Users\\karlo\\AppData\\Local\\Temp\\nodeTest";


function listfolder () {
    const promise = fs.readdir(tmp, {withFileTypes:true})
    const transfpromise = promise.then((results) => {
        const tab =[];
        results.forEach(function(resultobj) {
            tab.push({
                name: resultobj.name,
                isFolder: resultobj.isDirectory()
            })
        })
        return tab;
    })
    return transfpromise;
}

module.exports = {
    list: listfolder
}