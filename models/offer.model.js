import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    title:String,
    description:String,
    startDate:Date,
    endDate:Date,
    item:String
})

const Offer = mongoose.model('Offers',offerSchema);

export default Offer;
  