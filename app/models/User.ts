import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  goalWeight: { 
    type: Number, 
    required: false 
  },
  preferredUnits: {
    type: String,
    enum: ['lbs', 'kg'],
    default: 'lbs'
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);