const express = require("express")
const mongo = require("mongodb")
const objectId = require("mongodb").ObjectID
const sha256 = require("sha256")
var router = express.Router()

const URI = ""


// utility
function containsObject(obj, list) {
    var i;

    for (i = 0; i < list.length; i++) {
        var obj2 = {
            url: list[i].url,
            half: list[i].half
        }
        if (obj2.half === obj.half) {
            return true;
        }
    }

    return false;
}

function getUrl(half, list) {
    var i;

    for (i = 0; i < list.length; i++) {
        var obj2 = {
            url: list[i].url,
            half: list[i].half
        }
        if (obj2.half === half) {

            return list[i].url
        }
    }

    return false;
}

router.get("", (req, res) => {
    res.render("index")
})


router.post("/shorten", (req, res) => {
    var url = req.body.url

    var stump = "halflink"

    var hash = sha256(url)
    var link = req.headers.host + "/" + stump + "." + hash.substr(0, 3) + hash.substr(-2)

    var data = {
        url: url,
        half: link
    }

    mongo.connect(URI, (error, client) => {
        let db = client.db("half-link")

        let resultArray = []
        let coursor = db.collection("links").find()

        coursor.forEach((doc, err) => {
            resultArray.push(doc)
        }, () => {
            if (containsObject(data, resultArray)) {
                res.send(data)
            } else {
                db.collection("links").insertOne(data)
                res.send(data)
            }
        })


    })
})


router.get("/halflink.*", (req, res) => {
    var link = req.headers.host + req.path

    mongo.connect(URI, (error, client) => {
        let db = client.db("half-link")

        let resultArray = []
        let coursor = db.collection("links").find()

        coursor.forEach((doc, err) => {
            resultArray.push(doc)
        }, () => {
            var url = getUrl(link, resultArray)
            if (url) {

                console.log(`${link} ---> ${url}`)
                res.redirect(url)
            } else {

                res.redirect("/")
            }
        })
    })
})
module.exports = router