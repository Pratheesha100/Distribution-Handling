import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    
    address: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    password: {
      type: String,
      required: true,
     
    },
    contactN: {
      type: String,
      required: true,
     
    },

    
    nic: {
      type: String,
      required: true,
     
    },
    gender: {
      type: String,
      required: true,
     
    },
    age: {
      type: String,
      required: true,
     
    },
    designation: {
      type: String,
      required: true,
     
    },
    role: {
      type: String,
      required: true,
     
    },
    birthday: {
      type: String,
      required: true,
     
    },
    
   
    







    
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;