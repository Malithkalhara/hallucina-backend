import mongoose from "mongoose";

const itemQuantitySchema = new mongoose.Schema({
    itemId: String,
    quantity:Number
})

const purchaseSchema = new mongoose.Schema({
    date:Date,
    amount:Number,
    userId:String,
    items:[itemQuantitySchema]
})

const Purchase = mongoose.model('Purchases', purchaseSchema);

export default Purchase;