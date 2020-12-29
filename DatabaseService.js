const mongo = require("mongodb")
const objectId = require("mongodb").ObjectID
const parseString = require("xml2js").parseString
const fs = require("fs")

// load DB configs
let data = fs.readFileSync("dbconfig.xml")
data = data.toLocaleString()
var URI = ""
parseString(data, (err, res) => {
    if (err) console.log(err)
    URI = res.dbconfig.uri[0]
})

function connect(databaseName) {
    return new Promise((resolve, reject) => {
        mongo.connect(URI, (err, client) => {
            if (err)
                reject(err)
            let db = client.db(databaseName)
            resolve(db)
        })
    })
}




module.exports = {
    connect: async (databaseName) => {
        let db = await connect(databaseName)
        return db
    },
}