const { registerhelper } = require("../rgisterhelper/Userhelpers")

module.exports.register = async(req,res,next)=>{
    await  registerhelper(req.body).then(()=>{
        res.json({status:true,message:'registeration suceessfull'})
      }).catch((er)=>{
        res.json({status:false,message:'email already registered once'})
      })

}