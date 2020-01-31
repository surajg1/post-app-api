const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const router = express.Router();



exports.createUser = (req, res, next)=> {
    // Original
        bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                const user = new User({
                    email : req.body.email,
                    password: hash
                })
                user.save().then(result =>{
                    res.stats(201).json({
                        message: 'User Created',
                        result: result
                    });
                }).catch(error =>{
                  res.status(500).json({
                          message : "Accessed Denied!"
                  })
                  })
            })
 }

exports.userLogin =  (req, res, next)=> {

    let fatechdUser;

    User.findOne({email: req.body.email}).then(user => {
        if(!user){
            // console.log(user);
            return res.status(401).json({
                message : "authentication falid"
            });
        }
        fatechdUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result =>{
        if(!result){
            return res.status(401).json({
                message : "authentication falid"
            });
        }

        console.log(fatechdUser);

        const token = jwt.sign({email: fatechdUser.email, userId: fatechdUser._id},
                process.env.JWT_KEY, 
            {expiresIn: '1h'}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fatechdUser._id
            });    
            
        }).catch(err => {
            console.log(err);
        return res.status(401).json({
            message : "Invalid Login details provided"
        });
    })
}