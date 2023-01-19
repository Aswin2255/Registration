const mongoClient = require('mongodb').MongoClient
const state = {
    db:null
}
module.exports.connect=function(done){
    const url = 'mongodb+srv://aswin:1234@cluster0.xhsjgb7.mongodb.net/?retryWrites=true&w=majority'
    const dbname = 'register'
    mongoClient.connect(url,(err,data)=>{
        console.log('hereeee')
        
        if(err) return done(err)
        state.db = data.db(dbname)
        done()
    })
   
}
module.exports.get=function(){
    return state.db
}