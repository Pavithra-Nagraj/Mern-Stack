const cors = require("cors");
const express = require("express");

// const stripe = require("stripe")("")
const {uuid} = require("uuid")

const app = express();


//middlewares
app.use(express.json);
app.use(cors());


//Routes
app.get("/" ,(req,res)=>{
    res.send("It works at LCO")
})

//listen
app.listen(8282 , ()=>console.log("App is running at port 8282"))