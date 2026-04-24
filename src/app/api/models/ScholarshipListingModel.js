import mongoose from 'mongoose';

const scholarshipListingSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  type: { type: String, default: 'Scholarship', enum: ['Scholarship'] },
  amount: { type: String, default: '' },
  status: { type: String, default: 'active', enum: ['active', 'closed'] },
  applicantCount: { type: Number, default: 0 }
}, { timestamps: true });

export const ScholarshipListing = mongoose.models.ScholarshipListing || mongoose.model('ScholarshipListing', scholarshipListingSchema);
