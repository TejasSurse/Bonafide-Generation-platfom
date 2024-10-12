const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "/Views"));

app.use(express.static(path.join(__dirname, "Public")));

app.use(express.urlencoded({ extended: true })); 
async function DBConnect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/csmssstudents');
}

const Schema = mongoose.Schema;

const  studentSchema = new Schema({
    prn : Number,
    name : String,
    pass : Number,
    class : String,
    branch : String,
    Dob :  String,
});

const Student = mongoose.model('Student', studentSchema);



DBConnect().then((res)=>{
    console.log("Connected successfully");
}).catch((err)=>{ console.log("error not  connected") });


app.get("/", (req, res)=>{
    res.render("login.ejs");
});



app.post("/getuser", async (req, res)=>{
    let {prn, pass} = req.body;
    let result = await Student.findOne({prn: prn, pass: pass}).then( (result)=>{
        if(result){
            res.render("bonafide.ejs", {data : result});
        }else{
            res.send("not found");
        }
    }).catch((err)=>{
        console.log(err);
    }); 
});


app.listen(port, (req, res)=>{
    console.log("App is listening ");
});



