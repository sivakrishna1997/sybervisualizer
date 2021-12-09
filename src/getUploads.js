const fs = require('fs');
const path = require('path');
// const xlsx = require('xlsx');
const { success, error } = require('./response');

const saveFile = (file) => {
    return new Promise(async (resolve, reject) => {
        const savePath = path.join(__dirname, '../public', 'uploads', file.name);
        await file.mv(savePath);
        resolve(savePath);
    })
}

const saveFiles = async (req, res) => {
    try {
        const files = req.files.myfiles;
        if (Array.isArray(files)) {
            for (const file of files) {
                let savedpath = await saveFile(file);
            }
        } else {
            let savedpath = await saveFile(files);
        }
        res.redirect('/dashboard');
    } catch (err) {
        console.log("err::::", err)
        error(req, res, 'Error uploading file ', err)
    }

}


const getFilesFromFolder = (reqobj) => {
    return new Promise((resolve, reject) => {
        fs.readdir(reqobj.directoryPath, function (err, files) {
            if (err) {
                console.log('Unable to scan directory: ' + err);
                reject(null);
            } else {
                resolve(files)
            }
        });

    })
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

module.exports = { saveFiles, getFilesFromFolder }
