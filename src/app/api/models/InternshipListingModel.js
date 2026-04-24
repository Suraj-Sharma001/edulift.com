import mongoose from 'mongoose';

const internshipListingSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  type: { type: String, default: 'Internship', enum: ['Internship'] },
  status: { type: String, default: 'active', enum: ['active', 'closed'] },
  applicantCount: { type: Number, default: 0 }
}, { timestamps: true });

export const InternshipListing = mongoose.models.InternshipListing || mongoose.model('InternshipListing', internshipListingSchema);
