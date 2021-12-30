const fs = require('fs');
const path = require('path');
// const xlsx = require('xlsx');
const { success, error } = require('./response');


const createFolder = (req, res) => {
    const folderName = path.join(__dirname, '../public', 'uploads', req.body.folderName);
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        success(req, res, "Folder Created!", folderName);
    } else {
        error(req, res, "Folder Exist!", "");
    }
}

const getFolders = (reqobj) => {
    return new Promise((resolve, reject) => {
        const directories = fs.readdirSync(reqobj.directoryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
        if (directories) {
            resolve(directories)
        } else {
            console.log('Unable to scan directory: ', directories);
            resolve("No folders found!");
        }
    })
}

const getFoldersList = async (req, res) => {
    const directoryPath = path.join(__dirname, '../public', 'uploads');
    const folders = await getFolders({ directoryPath });
    if (Array.isArray(folders)) {
        success(req, res, "Folders", folders);
    } else {
        error(req, res, "No Folders found", folders);
    }
}

const saveFile = (file, folderName) => {
    return new Promise(async (resolve, reject) => {
        const savePath = path.join(__dirname, '../public', 'uploads', folderName, file.name);
        await file.mv(savePath);
        resolve(savePath);
    })
}

const saveFiles = async (req, res) => {
    try {
        console.log(req.body.folderName);
        debugger
        const files = req.files.myfiles;
        const folderName = req.body.folderName;

        if (Array.isArray(files)) {
            for (const file of files) {
                let savedpath = await saveFile(file, folderName);
            }
        } else {
            let savedpath = await saveFile(files, folderName);
        }
        // success(req, res, "Files added!", null);
        res.redirect('/upload');
    } catch (err) {
        console.log("err::::", err)
        error(req, res, 'Error uploading file ', err)
    }
}


const getFilesFromPath = (reqobj) => {
    return new Promise((resolve, reject) => {
        fs.readdir(reqobj.directoryPath, function (err, files) {
            if (err) {
                console.log('Unable to scan directory: ' + err);
                resolve(err);
            } else {
                resolve(files)
            }
        });
    })
}

const getFiles = async (req, res) => {
    const directoryPath = path.join(__dirname, '../public', 'uploads', req.body.folderName.trim());
    const files = await getFilesFromPath({ directoryPath });
    if (Array.isArray(files)) {
        success(req, res, "Files", files);
    } else {
        error(req, res, "No files found!", files);
    }
}

const getFilesFromFolders = async (req, res) => {
    const { folders } = req.body;
    console.log("folders", folders)
    var allFiles = [];
    if (folders.length !== 0) {
        folders.forEach(async (folder, index) => {
            const directoryPath = path.join(__dirname, '../public', 'uploads', folder.trim());
            var files = await getFilesFromPath({ directoryPath });
            var fetchedFiles = [];
            files.forEach(x => {
                fetchedFiles.push({
                    folderName: folder.trim(),
                    fileName: x
                })
            })
            allFiles = [...allFiles, ...fetchedFiles];
            console.log("allFiles", allFiles)

            if (index === folders.length - 1) {
                if (allFiles.length === 0) {
                    error(req, res, "No files found!", []);
                } else {
                    success(req, res, "Files", allFiles);
                }
            }
        })
    } else {
        error(req, res, "No files found!", []);
    }
}

const deleteFile = async (req, res) => {
    try {
        const filepath = path.join(__dirname, '../public', 'uploads', req.body.folderName.trim(), req.body.fileName.trim());
        if (fs.existsSync(filepath)) {
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(err);
                    error(req, res, "File deleting failed!", err);
                } else {
                    success(req, res, "File deleted successfully!", {});
                }
            })
        } else {
            error(req, res, "File not found!", filepath);
        }
    } catch (err) {
        console.log("err::::", err)
        error(req, res, 'Error deleting failed!', err)
    }

}



// app.post('/single', async (req, res, next) => {
//     try {
//         const file = req.files.myfile;

//         console.log("file::::=>", file)
//         // const fileName = new Date().getTime().toString() + path.extname(file.name);
//         const savePath = path.join(__dirname, 'public', 'uploads', file.name);
//         console.log("savePath::::=>", savePath)

//         // if(file.truncated){
//         //      throw new Error('File Size Is Too Large...');
//         // }

//         await file.mv(savePath);

//         // const workbook = xlsx.readFile(savePath);
//         // const sheetnames = Object.keys(workbook.Sheets);

//         // let i = sheetnames.length;
//         // while (i--) {
//         //     const sheetname = sheetnames[i];
//         //     let htmlfilecontent = xlsx.utils.sheet_to_html(workbook.Sheets[sheetname]);
//         //     let pathtosavehtmls = path.join(__dirname, 'public', 'uploads', file.name.split('.')[0] + sheetname + '.html');
//         //     fs.writeFileSync(pathtosavehtmls, htmlfilecontent);
//         // }

//         res.redirect('/');

//     } catch (err) {
//         console.log("err::::", err)
//         res.send('Error uploading file ' + err.message);
//     }
// })

module.exports = { saveFiles, getFilesFromFolders, createFolder, getFolders, getFoldersList, getFiles, deleteFile }
