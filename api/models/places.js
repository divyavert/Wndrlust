const  mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Types.ObjectId,ref:"user"},
    title: String,
    address: String,
    photos:[String],
    description:String,
    prek: [String],
    extrainfo:String,
    checkIn: Number,
    checkout: Number,
    maxguest: Number,

})
const placeModel = mongoose.model("Place",placeSchema)
module.exports = placeModel;