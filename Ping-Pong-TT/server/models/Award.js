import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const _____Schema = new Schema({
  name: {type: String, required: true},
  img: {type: String, required: true},
  
  // type: String  <-- whatever type you need it to be
  // required: true  <-- whether it needs to be provided or not
  // default: ""  <-- if its not required then set it's default to something so that it sets it
  // enum: []  <-- if only certain variables can be entered then use this
  // minLength: 0  <-- if there need to be a minimum length, usually only for Strings but can be used on numbers too but no recommended
  // maxLength: 0  <-- if there need to be a maximum length, usually only for Strings but can be used on numbers too but no recommended
  // min: 0  <-- if there need to be a minimum amount, only for type: Number
  // max: 0  <-- if there need to be a maximum amount, only for type: Number
},
  { timestamps: true, toJSON: { virtuals: true } }
)

_____Schema.virtual("", {
  localField: "_____Id", // for whatever id it applies to in your schema
  foreignField: "_id", // this compares to the id of the referenced object
  justOne: true, // or false based on if you want just one or multiple objects
  ref: "Account" // for accounts change to what ever db context
})