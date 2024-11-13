import mongoose from 'mongoose';


const saleSchema = new mongoose.Schema({
 

  id:{
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required:true,
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String, 
    required: true
  },
  date: {
    type: Date, 
    required: true
  },
  ShopName: {
    type: String, 
    required: true
  },
  
  RepId: {
    type: String, 
    required: true
  },
  agencyNo:
  {
    type: String,
    required: true,
    unique: true
  }
  
});


const Sale = mongoose.model('Sale', saleSchema);

export default  Sale;