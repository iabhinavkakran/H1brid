const User = require('../models/user')

const registerUser = async (req, res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        User.findOne({username: username}, function(err, foundOne){
            if(err){
                console.log(err);
            }else{
                if(foundOne){
                    res.status(223).send("Username already exist...");
                }else{
                    const user = new User({
                        username : username,
                        password : password,
                        role : role
                        });
                    user.save(function(err, data){
                        if(err){
                            console.log(err);
                        }else{
                            res.status(201).send("User Registered Successfully : " + data);
                        }
                    });
                }
            }
         });
    } catch(err){
      res.status(400).json({
        status: 'fail',
        message: err
      });
      }   
}

const loginUser = async (req, res) =>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({username: username}, async function(err, foundUser){
            if(err){
                console.log(err)
            }else{
                if(foundUser){
                    if(foundUser.password === password){
                        res.status(200).json({msg: "Loged in Successfully...",
                                              LoginID: foundUser._id})
                    }else{
                        res.send("Wrong Password");
                    }
                }else{
                    res.send("Wrong Username");
                }
            } 
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = { registerUser, loginUser }