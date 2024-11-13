import mongoose from "mongoose";
const returnschema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  prodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
   date: {
     type: Date,
     required: true,
   },
  reason: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  agencyNo: {
    type: String,
    required: true,
  },
});

const Returns = mongoose.model("Returns", returnschema);

export default Returns;
