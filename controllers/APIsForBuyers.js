const User = require('../models/user')
const Item = require('../models/item');
const Order = require('../models/order')

const getListOfSellers = async (req, res) =>{
    try {
        const users = await User.find({ role: 'Seller' });
        res.status(200).json({Data: {Seller:users.map((e,i)=>{return `Seller ${i+1} Username is < ${e.username} > Seller_id is < ${e._id} >`})}});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getSellerById = async (req, res) =>{
    try {
        const seller_id = req.params.seller_id;
        const seller = await User.findById({ _id:seller_id });
        if(!seller){
            return res.status(404).json({msg: `No Seller with id: ${seller_id}`})
        }
        const catalog = await Item.find({seller_username: seller.username})
        res.status(200).json({Seller_Username: seller.username, Catalog: catalog.map((e)=>{return `Product Name: < ${e.product_name} > Product Price: < ${e.product_price}₹ >`})});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createOrderById = async (req, res) =>{
    try{
        const seller_id = req.params.seller_id;
        const product_name = req.body.product_name;
        const product_quantity = req.body.product_quantity;
        const buyer_username = req.body.buyer_username;

        const buyer = await User.find({username: buyer_username});

        if(buyer.map((e)=>e.role).toString()=='Buyer'){
            User.findOne({_id:seller_id}, async function(err, foundOne){
                if(err){
                    console.log(err);
                }else{
                    if(foundOne){
                        const catalog = await Item.find({seller_username: foundOne.username})
                        const order = new Order({
                            buyer_username: buyer_username,
                            product_name : product_name,
                            product_quantity : product_quantity,
                            total_price : catalog.map((e)=>e.product_price) * product_quantity
                            });
                        order.save(function(err, data){
                            if(err){
                                console.log(err);
                            }else{
                                res.status(201).send("Order Placed Successfully : " + data);
                            }
                        });
                    }
                }
             });
        }else{
            res.status(404).json({msg: "This username: "+ buyer_username +" is either not a Registered User  or not a Buyer"})
        }       
    } catch(err){
      res.status(400).json({
        status: 'fail',
        message: err
      });
      }   
}

module.exports = { getListOfSellers, getSellerById, createOrderById }