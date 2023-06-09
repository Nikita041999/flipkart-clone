const User = require('../modals/user');
const jwt = require('jsonwebtoken')

exports.signup = async (req,res) => {
    const user_found = await User.findOne({email: req.body.email})
    if(user_found){
        return res.status(200).json({message: "user already registered"})
    }
    const {firstName, lastName,email,password} = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username:Math.random().toString()
        })
        console.log(_user);
        _user.save().then(data => res.status(200).send({message:"user created successfully"})).catch((err) => res.status(400).send({message: "Error is saving data"}))
}

exports.signin =  (req,res) => {
    User.findOne({email: req.body.email})
    .then(result => {
        if(result.authenticate(req.body.password)){
            const token = jwt.sign({_id: result._id},process.env.JWT_SECRET,{expiresIn: '1h'});
            const { firstName, lastName, email, role, fullName} = result;
            res.status(200).json({
                token,
                user: {
                    firstName, lastName,email, role, fullName
                }
            })
        }else{
            return res.status(400).json({message: 'invalid password'})
        }
    })
    .catch(err => res.status(400).json(err)) 
}

exports.requireSignIn = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next()
// const token = req.header.authenticate
}

exports.profile = (req,res,next) => {
   return res.status(200).send({message:"created a profile"})
// const token = req.header.authenticate
}