import mongoose from 'mongoose';


const agencySchema = new mongoose.Schema({
 

  AgencyName: {
    type: String,
    required: true
  },
  AgencyNo:{
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  Staffamount: {
    type: String,
    required: true
  },
  address: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true
  }
});


const Agency = mongoose.model('Agency', agencySchema);

export default  Agency;