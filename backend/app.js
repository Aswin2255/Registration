const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./connection')
const routes = require('./routes/Userroutes')


app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use('/',routes)

const port = 5000

app.listen(port,()=>{
    console.log(`server is running in port ${port} `)
})
db.connect((er)=>{
    if(er){
        console.log(er)
    }
    else{
        console.log('db connected')
    }
})
