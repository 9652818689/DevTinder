const adminAuth = (req,res,next)=>{
    const token = "xyzabc";
    const isAdminAuthrorized = token === 'xyz';
    if(!isAdminAuthrorized){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyzabc";
    const isUserAuthrorized = token === 'xyz';
    if(!isUserAuthrorized){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
}

module.exports = {userAuth,adminAuth}