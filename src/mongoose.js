const mongoose = require('mongoose'); 
// const url = "mongodb://localhost:27017/exceltohtml";
// const url = "mongodb+srv://syberze-html:Kanyarashi@cluster0.atjpk.mongodb.net/exceltohtml";
const url = "mongodb+srv://syberzen:syberzen123@cluster0.otq1r.mongodb.net/sybervisualizer";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
module.exports = () =>{
    mongoose.connect(url, options).then(
        response => {
            console.log('DB connected!')
        }, err => {
            console.log(err)
        }
    )
}