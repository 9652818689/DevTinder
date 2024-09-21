const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

connectDB().then(()=>{
    console.log("Database connectin establisted..");
    app.listen(3000,()=>{
        console.log("Server is Successfully listening on port 3000");
    })
}).catch((err)=>{
    console.log("Database cannot establisted...");
})

app.post("/signup", async(req,res)=>{
        const userObj = new User({
            firstName:"vijay",
            lastName:"kumar",
            emailId:"vijay@kumar.com",
            password:"vijay@123"
        })
        await userObj.save();
        res.send("User Data Saved Successfully!")
})

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

