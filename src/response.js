 const success = (req, res, msg, data) => {
    if (data) {
        res.json({
            status: 200,
            message: msg,
            data: data
        })
    } else {
        res.json({
            status: 300,
            message: msg,
        })
    }
}
 const error = (req, res, msg, err) => {
    res.json({
        status: 500,
        message: err?.message ? err?.message : msg,
    })
}


module.exports = {
    success , error
}