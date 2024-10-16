const express = require('express')
// call my controller
const Routes = require('./routes/Routes')

const app = express()

const port = 3000

app.use(express.json())

// routes
app.use('/api',Routes)

app.listen(port,()=>{
    console.log("Server running at port " + port)
})