const mongoose = require('mongoose');

const formDetailsSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  primaryPhone: String,
  otherPhones: String,
  primaryEmail: String,
  otherEmails: String,
  gender: String,
  dateOfBirth: String,
  country: String,
  city: String,
  currentAddress: String,
  permanentAddress: String,
  profilePicture: String,
  higherEducation: [{
    degree: String,
    specialization: String,
    collegeName: String,
    university: String,
    startYear: String,
    endYear: String,
    studyMode: String,
    aggregateType: String,
    aggregateValue: String
  }],
  twelfthStandard: [{
    institute: String,
    specialization: String,
    board: String,
    medium: String,
    aggregateType: String,
    aggregateValue: String
  }],
  tenthStandard: [{
    institute: String,
    board: String,
    medium: String,
    aggregateType: String,
    aggregateValue: String
  }],
  experiences: [
    {
      companyName: String,
      position: String,
      industry: String,
      jobType: String,
      startDate: Date,
      endDate: Date,
      responsibilities: String
    }
  ],
  skills: [String],
  projects: [
    {
      projectName: String,
      description: String,
      technologies: String,
      startDate: Date,
      endDate: Date,
      role: String,
      link: String
    }
  ],
  socialLinks: [{
    linkedin: String,
    portfolio: String,
    social: String,
    github: String
  }],
  preferences: [{
    jobLocation: String,
    salary: String,
    workSchedule: String
  }],
  additionalInfo: [{
    languages: String,
    relocationWillingness: String,
    noticePeriod: String
  }],
  backgroundCheckConsent: Boolean
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  formDetails: [formDetailsSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;