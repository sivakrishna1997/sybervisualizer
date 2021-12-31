const { Schema, model } = require("mongoose");
const { success, error } = require('./response');

const user = model('user',
    new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, },
        role: { type: Number, required: true, enum: [1, 2], default: 2 }, // 1 for admin, 2 for user 
        folders: ['string'],
        active: { type: Boolean, default: true },
        cdate: { type: Date },
        udate: { type: Date }
    })
)


const adduser = (req, res) => {
    try {
        let body = req.body;
        let newuser = new user({ email: body.email, password: body.password, role: body.role });
        newuser.save().then(
            doc => {
                success(req, res, "User Added Successfully!", doc);
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}
const login = (req, res) => {
    try {
        let body = req.body;
        let query = { email: body.email, password: body.password }
        user.findOne(query).then(
            doc => {
                if (doc) {
                    success(req, res, "Login Successfully!", doc);
                } else {
                    error(req, res, "User Not Found!", doc);
                }
            }, err => {
                error(req, res, 'Login Failed', err)
            }
        )
    } catch (err) {
        error(req, res, 'Login Failed', err)
    }
}
const getusers = (req, res) => {
    try {
        let body = req.body;
        let query = {};
        body.role ? query['role'] = body.role : null;

        user.find(query).then(
            doc => {
                success(req, res, "Users!", doc);
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}

const getUsersData = (body = {}) => {
    try {
        return new Promise((resolve, reject) => {
            let query = {};
            body.role ? query['role'] = body.role : null;
            user.find(query).then(
                doc => {
                    resolve(doc)
                }, err => {
                    resolve([])
                }
            )
        })
    } catch (err) {
        error(req, res, '', err)
    }
}

const deleteuser = (req, res) => {
    try {
        let body = req.body;
        let query = { email: body.email }
        user.deleteOne(query).then(
            doc => {
                if (doc.n == 0) {
                    error(req, res, "User deleting failed", null);
                } else {
                    success(req, res, "User deleted successfully!", {});
                }
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}

const addFolder = (req, res) => {
    try {
        let body = req.body;
        let query = {
            email: body.email
        }
        user.updateMany(query, { $addToSet: { folders: body.folderName } }).then(
            doc => {
                if (doc.matchedCount == 1) {
                    if (doc.modifiedCount == 0) {
                        error(req, res, "Folder exist!", null);
                    } else {
                        success(req, res, "Folder added successfully!", {});
                    }
                } else {
                    error(req, res, "User not matched", null);
                }
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}


const removeFolder = (req, res) => {
    try {
        let body = req.body;
        let query = {
            email: body.email
        }
        user.updateMany(query, { $pull: { folders: body.folderName } }).then(
            doc => {
                if (doc.matchedCount == 1) {
                    if (doc.modifiedCount == 0) {
                        error(req, res, "No folder found!", null);
                    } else {
                        success(req, res, "Folder removed successfully!", {});
                    }
                } else {
                    error(req, res, "User not matched", null);
                }
            }, err => {
                error(req, res, '', err)
            }
        )
    } catch (err) {
        error(req, res, '', err)
    }
}

module.exports = {
    adduser,
    login,
    getusers,
    deleteuser,
    addFolder,
    removeFolder,
    getUsersData
}

