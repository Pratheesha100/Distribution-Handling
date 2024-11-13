import mongoose from 'mongoose';


const recordSchema = new mongoose.Schema({
 

  id: {
    type: String,
    required: true
  },
  productname: {
    type: String,
    required: true
  },
  manufactureDate: {
    type: String,
    required: true
  },
  expiredate: {
    type: String, 
    required: true
  },
  batchnumber: {
    type: String, 
    required: true
  },
  price: {
    type: String, 
    required: true
  },
   vehicleid: {
    type: String, 
    required: true
  },
  driveid: {
    type: String, 
    required: true
  },
  deliverid: {
    type: String, 
    required: true
  },
  agencyNo:{
    type: String, 
    required: true
  }
});


const Record = mongoose.model('Record', recordSchema);

export default  Record;