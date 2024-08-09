const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const Pwdata = require("../backend/models")
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


//showing passwords
app.get('/', async (req, res) => {

  try {
    const pwinfo = await Pwdata.find({})
    res.send(pwinfo)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//showing Password by search
app.get('/:input', async (req, res) => {

  try {
    
    const pwinfo = await Pwdata.find({username:req.params.input}||{site:req.params.input})
    res.send(pwinfo)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//saving Password
app.post('/save', async (req, res) => {

  try {
    const pwinfo = await Pwdata(req.body)
    res.send(pwinfo)
    pwinfo.save() 

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//deleting Password
app.delete("/:input",async(req,res)=>{
  try {
    const pwinfo = await Pwdata.findOneAndDelete({username:req.params.input})
    res.send({msg:"deleted"})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Updating password
app.put("/:input",async(req,res)=>{
  try {
    const pwinfo = await Pwdata.findByIdAndUpdate(req.params.input,req.body)
    const updateinfo =  await Pwdata.findById(req.params.input)
    res.send(updateinfo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

mongoose.connect("mongodb://127.0.0.1:27017",
  {
    dbName: "pwmanager",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(() => { console.log("connected succesfully") })
  .catch(() => { console.log("connection failed") })