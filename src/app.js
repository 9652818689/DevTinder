const express = require('express');
const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello From the server!")
})
app.get("/user",(req,res)=>{
    res.send("Data Fetched Successfully!")
});
app.post("/user",(req,res)=>{
    res.send("Posted Data Successfully!")
});
app.delete("/user",(req,res)=>{
    res.send("Data Deleted Successfully!")
});

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send("data Fetched successfully!")
})
app.listen(3000,()=>{
    console.log("Server is Successfully listening on port 3000");
    
})