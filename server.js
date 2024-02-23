const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config()
const app=express();
app.use(cors());
app.use(express.json())



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>console.log("DB connected")).catch((error)=>console.log(error));

// app.get("/",(req,res)=>{
//     res.json("hellow")
// })
//schema
const userSchema=mongoose.Schema({
    title:String,
    description:String,
    status:String,
},{timestamps:true})

const userModel=mongoose.model("user",userSchema)
//read
app.get("/", async(req,res)=>{
    const data=await userModel.find()
    res.json({success:true,data:data})
})
//create

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save successfully",data:data})
})
//update
app.put("/update",async(req,res)=>{
  console.log(req.body)
  const {_id,...rest}=req.body
//   console.log(rest)
 const data= await userModel.updateOne({_id:_id},rest)
  res.send({success:true,message:"data updated successfully",data:data})
})
//delete api
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully",data:data})
})

const PORT =process.env.PORT ||8002
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})