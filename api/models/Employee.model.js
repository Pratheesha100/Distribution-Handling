import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
 
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  agency: {
    type: String, 
    required: true
  },
  employmentdate: {
    type: String, 
    required: true
  },
  contact: {
    type: String, 
    required: true
  },
  targets: {
    type: String, 
    required: true
  },
  agencyNo:{
    type: String, 
    required: true
  },
  month:{
    type: String, 
    required: true
  }
});


const Employee = mongoose.model('Employee', employeeSchema);

export default  Employee;