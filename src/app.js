const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUp } = require('../utils/validator');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const validator = require('validator');

connectDB().then(()=>{
    console.log("Database connectin establisted..");
    app.listen(3000,()=>{
        console.log("Server is Successfully listening on port 3000");
    })
}).catch((err)=>{
    console.log("Database cannot establisted...");
})

app.post("/signup", async(req,res)=>{
    console.log(req.body);

    try{
      validateSignUp(req)
      const {firstName,lastName,emailId,password} = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const userObj = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash
      })
        let userres =  await userObj.save(); 
        return res.status(200).send({message:"User Data Saved Successfully!",data:userres})
    }catch(err){
       return res.status(500).send("Failed to register the user: "+err.message)
    }
})

app.post("/login", async(req,res)=>{
  try{
    const {emailId,password} = req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("Email id is not valid!");
    }
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.status(200).send("Login Succssfully!")
    }else{
      throw new Error("Invalid Credentails!")
    }
  }catch(err){
    return res.status(500).send("Failed to Login:"+err.message)
  }
})

app.patch("/user/:userId", async (req, res) => {
    let userId = req.params?.userId;
    let data = req.body;
  
    try {
      let ALLOWEDKEYS = ["firstName", "lastName", "password", "gender", "skills", "age"];
      
      let updatedKeysValid = Object.keys(data).every((key) => ALLOWEDKEYS.includes(key));
      if (!updatedKeysValid) {
        throw new Error("Cannot update: Invalid field(s) in update data.");
      }
  
      if (data.skills && data.skills.length > 10) {
        throw new Error("Cannot add more than 10 skills.");
      }
  
      let updatedRes = await User.findByIdAndUpdate(
        { _id: userId },
        data,
        {
          returnDocument: "after", 
          runValidators: true,    
        }
      );
  
      if (!updatedRes) {
        return res.status(404).send({ message: "User not found." });
      }
  
      res.status(200).send({ message: "User updated successfully!", data: updatedRes });
    } catch (err) {
      console.error("Failed to update the user:", err.message);
      res.status(500).send({ message: "Failed to update the user", error: err.message });
    }
  });
  

// app.use("/test",(req,res)=>{
//     res.send("Hello From the server!")
// })

// app.use("/admin",adminAuth);

// app.get('/admin/adminUser',(req,res)=>{
//     res.send("Admin User Data send!")
// })

// app.post("/user/login",(req,res)=>{
//     res.send("User LoggedIn Successfully!");
// })

// app.get("/user",userAuth,(req,res)=>{
//     res.send("User Data send");
// })
// app.use("/",(err,req,res,next)=>{
//     //Log your Error
//     res.status(500).send("something went wrong!!")
// });

// app.get("/getUsersData",(req,res)=>{
//     // try{
//         throw new Error("asdfdsafdsaf");
//             res.send("User data sent")
//     // }catch(err){
//         // res.status(500).send("some error contact support team")
//     // }
// })
// app.use("/", (err,req,res,next)=>{
//     //Log your error
//     res.status(500).send("Something went wrong!!")
// })
// app.get("/user",(req,res)=>{
//     res.send("Data Fetched Successfully!")
// });
// app.post("/user",(req,res)=>{
//     res.send("Posted Data Successfully!")
// });
// app.delete("/user",(req,res)=>{
//     res.send("Data Deleted Successfully!")
// });

// app.get("/user/:userId/:name/:password",(req,res)=>{
//     console.log(req.params);
//     res.send("data Fetched successfully!")
// })

// app.use("/user",(req,res,next)=>{
// console.log("Handling the route to the user!!");
// next();
// // res.send("Response!")
// },
// (req,res,next)=>{
//     console.log("Handling the route to the user2!!");
//     next();
//     // res.send("Response2")
// },
// (req,res,next)=>{
//     console.log("Handling the route to the user3!");
//     next();
//     // res.send("Response3")
// },
// (req,res,next)=>{
//     console.log("Handling the route to the user4!!");
//     next();
//     // res.send("Response4")
// },
// (req,res,next)=>{
//     console.log("Handling the route to the user5");
//     res.send("Response5")
// }
// )

