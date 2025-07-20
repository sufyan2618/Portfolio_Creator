import React, { useState } from 'react';
import useAuthStore from '../Store/useAuthStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Globe,
  Plus,
  Save,
  Upload,
  Award,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Languages,
  Heart,
  Sparkles
} from 'lucide-react';

import { SiInstagram, SiYoutube, SiFacebook } from 'react-icons/si';
import { FaLink } from 'react-icons/fa';

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    profilePicture: null,
  },
  services: [{ title: '', description: '' }],
  about: '',
  skills: '',
  education: [
    { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' }
  ],
  workExperience: [
    { company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }
  ],
  projects: [
    { title: '', description: '', technologies: '', projectUrl: '', image: null }
  ],
  certifications: [
    { name: '', issuer: '', date: '', credentialUrl: '' }
  ],
  languages: [
    { language: '', proficiency: '' }
  ],
  interests: '',
  socialLinks: { facebook: '', instagram: '', youtube: '', other: '' },
  additionalInfo: ''
};

const InfoPage = () => {
  const [formData, setFormData] = useState(initialState);
  const { SaveData, authUser, isSavingData } = useAuthStore();
  const id = authUser?._id || null;

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] // Assuming single file upload
      }));
    }
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  };

  const navigate = useNavigate();

  // Handle nested object changes (socialLinks)
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  // Handle array fields (skills, interests, technologies, imageUrls)
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(',').map((item) => item.trim())
    }));
  };

  // Handle dynamic array fields (education, workExperience, projects, certifications, languages)
  const handleDynamicArrayChange = (index, field, value, section) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index][field] = value;
      return { ...prev, [section]: updated };
    });
  };

  // Add new entry to dynamic arrays
  const handleAddEntry = (section, entry) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], entry]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incompleteProject = formData.projects.find(p => !p.title || !p.image);
    if (incompleteProject) {
      toast.error('Every project must have a title and an image.');
      return; // Stop the submission
    }

    const dataForBackend = {
      personalInfo: {
        fullName: formData.personalInfo.fullName,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        address: formData.personalInfo.address,
        website: formData.personalInfo.website,
        linkedin: formData.personalInfo.linkedin,
        github: formData.personalInfo.github,
        twitter: formData.personalInfo.twitter,
      },
      about: formData.about,
      skills: typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()) : formData.skills,
      interests: typeof formData.interests === 'string' ? formData.interests.split(',').map(i => i.trim()) : formData.interests,
      education: formData.education,
      workExperience: formData.workExperience,
      projects: formData.projects.map(p => ({
        title: p.title,
        description: p.description,
        projectUrl: p.projectUrl,
        technologies: typeof p.technologies === 'string' ? p.technologies.split(',').map(t => t.trim()) : p.technologies,
      })),
      certifications: formData.certifications,
      languages: formData.languages,
      socialLinks: formData.socialLinks,
      additionalInfo: formData.additionalInfo,
      services: formData.services,
    };

    const form = new FormData();
    form.append('id', id);
    form.append('data', JSON.stringify(dataForBackend));

    if (formData.personalInfo.profilePicture) {
      form.append('profileImage', formData.personalInfo.profilePicture);
    }

    formData.projects.forEach((project) => {
      form.append('projectImages', project.image);
    });

    const res = await SaveData(form);

    if (res) {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Portfolio Information</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Create Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Dream Portfolio
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enter your information to get started with your portfolio. Leave fields blank to use default values.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 space-y-8">

          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.personalInfo.website}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your website URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your LinkedIn profile URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.personalInfo.github}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your GitHub profile URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.personalInfo.twitter}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your Twitter profile URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, profilePicture: e.target.files[0] }
                    }));
                  }}
                  className="hidden"
                  id="profile-picture"
                />
                <label
                  htmlFor="profile-picture"
                  className="flex items-center justify-center w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-400 hover:bg-slate-700 cursor-pointer transition-all duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {formData.personalInfo.profilePicture ? 'Change Profile Picture' : 'Choose Profile Picture'}
                </label>
                {formData.personalInfo.profilePicture && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Selected: {formData.personalInfo.profilePicture.name}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">About & Details</h2>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">About You</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write a short bio or summary about yourself"
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Services Offered */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Services Offered</label>
              {formData.services.map((service, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <input
                    type="text"
                    placeholder="Service Title"
                    value={service.title}
                    onChange={e => handleDynamicArrayChange(idx, 'title', e.target.value, 'services')}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Service Description"
                    value={service.description}
                    onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'services')}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('services', { title: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript, React, Node.js"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interests (comma separated)</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g. Reading, Football, Painting"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any extra information you want to add"
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Social Links</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SiFacebook className="w-5 h-5 gap-2 mb-3 text-purple-400" />
                <input
                  type="url"
                  name="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleSocialChange}
                  placeholder="Facebook profile URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <SiInstagram className="w-5 h-5 gap-2 mb-3 text-purple-400" />
                <div>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleSocialChange}
                    placeholder="Instagram profile URL"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <SiYoutube className="w-5 h-5 gap-2 mb-3 text-purple-400" />
                <input
                  type="url"
                  name="youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleSocialChange}
                  placeholder="YouTube channel URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <FaLink className="w-5 h-5 gap-2 mb-3 text-purple-400" />
                <input
                  type="url"
                  name="other"
                  value={formData.socialLinks.other}
                  onChange={handleSocialChange}
                  placeholder="Other social profile URL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          <div className="space-y-8">

            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>
              {formData.education.map((edu, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Education {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={e => handleDynamicArrayChange(idx, 'institution', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={e => handleDynamicArrayChange(idx, 'degree', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={e => handleDynamicArrayChange(idx, 'fieldOfStudy', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={edu.startDate}
                      onChange={e => handleDynamicArrayChange(idx, 'startDate', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={edu.endDate}
                      onChange={e => handleDynamicArrayChange(idx, 'endDate', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Grade"
                      value={edu.grade}
                      onChange={e => handleDynamicArrayChange(idx, 'grade', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={edu.description}
                      onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'education')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('education', { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>

            {/* Work Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Work Experience</h2>
              </div>
              {formData.workExperience.map((exp, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Experience {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={e => handleDynamicArrayChange(idx, 'company', e.target.value, 'workExperience')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={e => handleDynamicArrayChange(idx, 'position', e.target.value, 'workExperience')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={e => handleDynamicArrayChange(idx, 'startDate', e.target.value, 'workExperience')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={e => handleDynamicArrayChange(idx, 'endDate', e.target.value, 'workExperience')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`currently-working-${idx}`}
                        checked={exp.currentlyWorking}
                        onChange={e => handleDynamicArrayChange(idx, 'currentlyWorking', e.target.checked, 'workExperience')}
                        className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={`currently-working-${idx}`} className="text-sm text-gray-300">
                        Currently Working
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Description"
                      value={exp.description}
                      onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'workExperience')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('workExperience', { company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            {/* Projects */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Projects</h2>
              </div>
              {formData.projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Project {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={proj.title}
                      onChange={e => handleDynamicArrayChange(idx, 'title', e.target.value, 'projects')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={proj.description}
                      onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'projects')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (comma separated)"
                      value={proj.technologies}
                      onChange={e => handleDynamicArrayChange(idx, 'technologies', e.target.value, 'projects')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="url"
                      placeholder="Project URL"
                      value={proj.projectUrl}
                      onChange={e => handleDynamicArrayChange(idx, 'projectUrl', e.target.value, 'projects')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        required
                        id={`project-image-${idx}`}
                        onChange={e => {
                          const file = e.target.files[0];
                          setFormData(prev => {
                            const updated = [...prev.projects];
                            updated[idx].image = file;
                            return { ...prev, projects: updated };
                          });
                        }}
                      />
                      <label
                        htmlFor={`project-image-${idx}`}
                        className="flex items-center justify-center w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-400 hover:bg-slate-700 cursor-pointer transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {proj.image ? 'Change Image' : 'Choose Image'}
                      </label>
                      {proj.image && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Selected: {proj.image.name}</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('projects', { title: '', description: '', technologies: '', projectUrl: '', imageUrls: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Certifications</h2>
              </div>
              {formData.certifications.map((cert, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Certification {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={cert.name}
                      onChange={e => handleDynamicArrayChange(idx, 'name', e.target.value, 'certifications')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={e => handleDynamicArrayChange(idx, 'issuer', e.target.value, 'certifications')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      placeholder="Date"
                      value={cert.date}
                      onChange={e => handleDynamicArrayChange(idx, 'date', e.target.value, 'certifications')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="url"
                      placeholder="Credential URL"
                      value={cert.credentialUrl}
                      onChange={e => handleDynamicArrayChange(idx, 'credentialUrl', e.target.value, 'certifications')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('certifications', { name: '', issuer: '', date: '', credentialUrl: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Certification
              </button>
            </div>

            {/* Languages */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Languages className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Languages</h2>
              </div>
              {formData.languages.map((lang, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Language {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Language"
                      value={lang.language}
                      onChange={e => handleDynamicArrayChange(idx, 'language', e.target.value, 'languages')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Proficiency"
                      value={lang.proficiency}
                      onChange={e => handleDynamicArrayChange(idx, 'proficiency', e.target.value, 'languages')}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEntry('languages', { language: '', proficiency: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Language
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              disabled={isSavingData}
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-semibold"
            >
              <Save className="w-5 h-5" />
              {isSavingData ? 'Saving Please Wait...' : 'Save Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoPage;
