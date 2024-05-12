const express = require('express');
const routes = express.Router();
const productModel = require('../models/productModel');



routes.post('/',  (req, res)=> {
    try{
        const {name , price, description, image}=req.body
        
         const product = new productModel({
            name,
            price,
            description,
            image 
        });
   
    
    
        product.save();
        res.status(201).json(product);
    
    }catch(err) {
        res.status(500).json({message: err.message});
    }
});

routes.get('/',async (req, res)=>{
    try {
        const allProducts =await productModel.find();
        console.log(allProducts);
        res.status(200).json(allProducts);
    }catch(err) {
        res.status(500).json({message: err.message});
    }

});

routes.delete('/:id',async(req, res) =>{
    try{
        const productId = req.params.id;
        const product =await productModel.findByIdAndDelete(productId);
        product.save();
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }


});

routes.put('/:id',async(req, res) =>{
    try{
        
        const productId = req.params.id;
        const product =await productModel.findByIdAndUpdate(productId, req.body);
        product.save();
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});
routes.get('/:id',async(req, res) =>{
    try{
        
        const productId = req.params.id;
        const product =await productModel.find({_id:productId});
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


module.exports = routes;