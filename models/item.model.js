import mongoose from 'mongoose';
import validator from 'validator';


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Item name is required!"],
        unique:true
    }, 
    size: {
        type: String,
        required: [true, "Size is required!"]
    },
    category: {
        type: String,
        required: [true, "Category is required!"]
    },
    subCategory: {
        type: String,
        required: [true, "Sub Category is required!"]
    },
    tags: {
        type:[String]
    },
    images: {
        type:[String]

    },
    price: {
        type:Number,
        required: true
    }

},{timestamps:true})


const Item = mongoose.model('Items',itemSchema);

export default Item;