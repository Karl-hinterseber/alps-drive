// Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
// GET /api/drive
const fs = require ('fs/promises');
const tmp = "C:\\Users\\karlo\\AppData\\Local\\Temp\\nodeTest";
const path = require ('path');


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
 //Retourne si c'est un dossier ou un fichier
function folderOrFile (name, folder='') {
    const promiseDeux = fs.stat(path.join(tmp,folder,name))
    return promiseDeux;
}

//Retourne creation d'un dossier
function createFolder (newfolder) {
    const promiseNewFolder = fs.mkdir(tmp+'\\'+newfolder)
    return promiseNewFolder;
}

//Retourne crestion d'un dossier dans un dossier
function createFolderInFolder (openFolder, newfolder) {
    const promiseCreateFolderInFolder = fs.mkdir(tmp+'\\'+openFolder+'\\'+newfolder)
    return promiseCreateFolderInFolder;
}

//Retourne si c'est alpha-numerique
function ifAlphanumerique (nameNewFolder) {
    const test = /^[a-zA-Z\s\.\d]+$/.test(nameNewFolder)
    return test;
}

//Retourne supprimer fichier
function deleteFile (file) {
    const deletefile = fs.rm(tmp+'\\'+file)
    return deletefile;
}

//Retourne supprime un dossier
function deleteFolder (folder) {
    const deletefolder = fs.rmdir(tmp+'\\'+folder)
    return deletefolder;
}

function deleteFolderInFolder (openfolder, folder) {
    const deleteFolderinfolder = fs.rmdir(tmp+'\\'+openfolder+'\\'+folder)
    return deleteFolderinfolder;
}

function deleteFileInFile (openfolder, file) {
    const deletefileinfile = fs.rm(tmp+'\\'+openfolder+'\\'+file)
    return deletefileinfile;
}

module.exports = {
    returnContent: returnContent,
    list: listfolder,
    folderOrFile: folderOrFile,
    createFolder: createFolder,
    ifAlphanumerique: ifAlphanumerique,
    createFolderInFolder: createFolderInFolder,
    deleteFolder: deleteFolder,
    deleteFile: deleteFile,
    deleteFolderInFolder: deleteFolderInFolder,
    deleteFileInFile: deleteFileInFile
}