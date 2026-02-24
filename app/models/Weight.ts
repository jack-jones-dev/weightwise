import mongoose from 'mongoose';

const WeightSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
    weight: {
    type: Number,
    required: true
  },
    date: {
    type: Date,
    default: Date.now
  },
  bodyFatPercentage: {
    type: Number,
    required: false
  }
}, { timestamps: true });

export default mongoose.models.Weight || mongoose.model('Weight', WeightSchema);