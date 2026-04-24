import mongoose from 'mongoose';

const internshipApplicationSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipListing', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String },
  college: { type: String },
  degree: { type: String },
  graduationYear: { type: String },
  resume: { type: String },
  position: { type: String, required: true },
  status: { type: String, enum: ['Applied','Under Review','Shortlisted','Selected','Rejected'], default: 'Applied' },
}, { timestamps: true });

// Prevent duplicate applications from the same candidate for the same listing
internshipApplicationSchema.index({ candidateId: 1, listingId: 1 }, { unique: true });

export const InternshipApplication = mongoose.models.InternshipApplication || mongoose.model('InternshipApplication', internshipApplicationSchema);
