const mongoose = require("mongoose");
// const validator = require("validator")
const OrderSchema = mongoose.Schema({
 
   
    email:{
        type:String,
        required:true,
        // unique:true,
        
    },
    
   
  
    order_data:{
        type:Array,
        required:true
    },
     
    
})

const newOrder = new mongoose.model("OurOrderData",OrderSchema);
module.exports = newOrder;