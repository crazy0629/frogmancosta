import mongoose from 'mongoose';

export interface IApplication {
  _id?: string;
  name: string;
  email: string;
  company: string;
  revenue: string;
  challenges: string;
  goals: string;
  timeline: string;
  budget: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  notes?: string;
}

const ApplicationSchema = new mongoose.Schema<IApplication>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  revenue: {
    type: String,
    required: [true, 'Current revenue is required'],
    enum: [
      'Under $10K/month',
      '$10K-50K/month', 
      '$50K-100K/month',
      '$100K-500K/month',
      '$500K-1M/month',
      'Over $1M/month'
    ]
  },
  challenges: {
    type: String,
    required: [true, 'Challenges description is required'],
    trim: true,
    maxlength: [1000, 'Challenges cannot be more than 1000 characters']
  },
  goals: {
    type: String,
    required: [true, 'Goals description is required'],
    trim: true,
    maxlength: [1000, 'Goals cannot be more than 1000 characters']
  },
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    enum: [
      'ASAP (Within 30 days)',
      '1-3 months',
      '3-6 months',
      '6+ months'
    ]
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: [
      'Under $5K/month',
      '$5K-15K/month',
      '$15K-30K/month', 
      '$30K-50K/month',
      'Over $50K/month'
    ]
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Create index for better query performance
ApplicationSchema.index({ email: 1, submittedAt: -1 });
ApplicationSchema.index({ status: 1, submittedAt: -1 });

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);