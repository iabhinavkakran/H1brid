const Item = require('../models/item')
const User =  require('../models/user')
const Order = require('../models/order')

const createCatalog = async (req, res) =>{
    try{
        const seller_username = req.body.seller_username;
        const product_name = req.body.product_name;
        const product_price = req.body.product_price;

        const user = await User.find({username: seller_username})
        if(user.map((e)=>e.username.toString()) == seller_username ){
            if(user.map((e)=>e.role.toString()) == "Seller"){
                Item.findOne({seller_username: seller_username}, function(err, foundOne){
                    if(err){
                        console.log(err);
                    }else{
                        if(foundOne){
                            res.status(223).send("Username already exist...");
                        }else{
                            const catalog = new Item({
                                seller_username : seller_username,
                                product_name : product_name,
                                product_price : product_price
                                });
                            catalog.save(function(err, data){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.status(201).send("Catalog Added Successfully : " + data);
                                }
                            });
                        }
                    }
                 });
            }else{
                res.status(404).json({msg: "This username: "+ seller_username +" is not a Seller"})
            }          
        }else{
            res.status(404).json({msg: "No Seller found for the username: "+ seller_username})
        }

    } catch(err){
      res.status(400).json({
        status: 'fail',
        message: err
      });
      }   
}

const orderReceived = async (req, res) =>{
    try {
        const order = await Order.find({ });
        res.status(200).json({Data: order.map((e,i)=>{return `Buyer's Username is < ${e.buyer_username} > Order_id is < ${e._id} >`})});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = { createCatalog, orderReceived }