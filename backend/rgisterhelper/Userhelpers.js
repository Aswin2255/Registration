const db = require('../connection')
const collection = require('../collection')
module.exports.registerhelper = async(userdata)=>{
    return new Promise(async(resolve, reject) => {
        
        let user = await db.get().collection(collection.usercollection).findOne({email:userdata.email})
        if(user){
            reject('user already exist')
        }
        else{
            await db.get().collection(collection.usercollection).insertOne(userdata).then((data)=>{
                resolve('user registerd sucessfully')
            })
        }
       
    
        
    })
   
}