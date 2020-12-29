const express = require("express")
const cors = require("cors")
const routes = require("./Routes")
const path = require("path")
const bodyparser = require("body-parser")
// prepare

var app = express()


// content parsers
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json({
    extended: true
}))



app.use(cors())
app.use(express.static(__dirname + '/assets'));
app.set('views', path.join(__dirname, '/assets/views'))
app.set("view engine", "ejs")
app.use("/", routes)



// Run

var PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})