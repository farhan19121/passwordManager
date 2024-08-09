const mongoose = require("mongoose")

const pw = mongoose.Schema(
     {
          site:{
               type:String,
               required:true,
          },
          username:{
               type:String,
               required:true,
          },
          password:{
               type:String,
               required:true,
          }

     },{timestamps:true}
) 

const Pwdata =  mongoose.model("Pwdata",pw)
module.exports = Pwdata