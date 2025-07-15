import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  personalInfo: {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    profilePictureUrl: { type: String }
  },

  services: [{
    title: { type: String }, // Title of the service
    description: { type: String }, // Description of the service
  }],
  about: { type: String }, // Short bio or summary

  skills: [{ type: String }], // List of skills

  education: [
    {
      institution: { type: String },
      degree: { type: String },
      fieldOfStudy: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      grade: { type: String },
      description: { type: String }
    }
  ],

  workExperience: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      currentlyWorking: { type: Boolean },
      description: { type: String }
    }
  ],

  projects: [
    {
      title: { type: String },
      description: { type: String },
      technologies: [{ type: String }],
      projectUrl: { type: String },
      imageUrls: [{ type: String }]
    }
  ],

  certifications: [
    {
      name: { type: String },
      issuer: { type: String },
      date: { type: Date },
      credentialUrl: { type: String }
    }
  ],

  languages: [
    {
      language: { type: String },
      proficiency: { type: String } // e.g., Beginner, Intermediate, Fluent
    }
  ],

  interests: [{ type: String }], // Hobbies or interests

  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    other: { type: String }
  },

  additionalInfo: { type: String }, // Any extra info

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Info = mongoose.model('Info', InfoSchema);
export default Info;
