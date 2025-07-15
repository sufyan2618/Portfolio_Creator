import React, { useState } from 'react';
import useAuthStore from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';


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
  profilePictureUrl: '',
  },
  services: [ { title: '', description: '' }],
  about: '',
  skills: '',
  education: [
    { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' }
  ],
  workExperience: [
    { company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }
  ],
  projects: [
    { title: '', description: '', technologies: '', projectUrl: '', imageUrls: '' }
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
  const {SaveData, authUser} = useAuthStore();
  const id = authUser?._id || null;
  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Transform skills, interests, technologies, imageUrls to arrays if not already
   
    const dataToSend = {
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        website: formData.website,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
        profilePictureUrl: formData.profilePictureUrl
      },
      services: formData.services.map(s => ({
        title: s.title,
        description: s.description
      })),
      about: formData.about,
      skills: typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()) : formData.skills,
      interests: typeof formData.interests === 'string' ? formData.interests.split(',').map(i => i.trim()) : formData.interests,
      education: formData.education,
      workExperience: formData.workExperience,
      projects: formData.projects.map(p => ({
        ...p,
        technologies: typeof p.technologies === 'string' ? p.technologies.split(',').map(t => t.trim()) : p.technologies,
        imageUrls: typeof p.imageUrls === 'string' ? p.imageUrls.split(',').map(i => i.trim()) : p.imageUrls
      })),
      certifications: formData.certifications,
      languages: formData.languages,
      socialLinks: formData.socialLinks,
      additionalInfo: formData.additionalInfo
    };

    const res = await SaveData(dataToSend, id);
    if(res){
        navigate('/designs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-center">Create a Stunning Portfolio</h1>
      <p className="text-lg text-center">
        Enter your information to get started with your portfolio. Leave fields blank to use default values.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Enter your website URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Enter your LinkedIn profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="Enter your GitHub profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Twitter</label>
          <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Enter your Twitter profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
          <input type="url" name="profilePictureUrl" value={formData.profilePictureUrl} onChange={handleChange} placeholder="Enter URL of your profile picture" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        {/* Services Section */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Services Offered</label>
          {formData.services.map((service, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Service Title" value={service.title} onChange={e => handleDynamicArrayChange(idx, 'title', e.target.value, 'services')} className="px-2 py-1 border rounded" />
              <input type="text" placeholder="Service Description" value={service.description} onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'services')} className="px-2 py-1 border rounded" />
            </div>
          ))}

          <button type="button" onClick={() => handleAddEntry('services', { title: '', description: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Service</button>
        </div>

        {/* About, Skills, Interests, Additional Info and Social Links */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">About You</label>
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Write a short bio or summary about yourself" rows={4} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. JavaScript, React, Node.js" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Interests (comma separated)</label>
          <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g. Reading, Football, Painting" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Additional Information</label>
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Any extra information you want to add" rows={3} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium mb-2">Facebook</label>
          <input type="url" name="facebook" value={formData.socialLinks.facebook} onChange={handleSocialChange} placeholder="Facebook profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Instagram</label>
          <input type="url" name="instagram" value={formData.socialLinks.instagram} onChange={handleSocialChange} placeholder="Instagram profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">YouTube</label>
          <input type="url" name="youtube" value={formData.socialLinks.youtube} onChange={handleSocialChange} placeholder="YouTube channel URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Other Social Link</label>
          <input type="url" name="other" value={formData.socialLinks.other} onChange={handleSocialChange} placeholder="Other social profile URL" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
        </div>
      </div>

      {/* Dynamic Sections (Education, Work Experience, Projects, Certifications, Languages) */}
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-semibold">Education</h2>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Institution" value={edu.institution} onChange={e => handleDynamicArrayChange(idx, 'institution', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Degree" value={edu.degree} onChange={e => handleDynamicArrayChange(idx, 'degree', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={e => handleDynamicArrayChange(idx, 'fieldOfStudy', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="date" placeholder="Start Date" value={edu.startDate} onChange={e => handleDynamicArrayChange(idx, 'startDate', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="date" placeholder="End Date" value={edu.endDate} onChange={e => handleDynamicArrayChange(idx, 'endDate', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Grade" value={edu.grade} onChange={e => handleDynamicArrayChange(idx, 'grade', e.target.value, 'education')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Description" value={edu.description} onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'education')} className="px-2 py-1 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => handleAddEntry('education', { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Education</button>

        <h2 className="text-2xl font-semibold">Work Experience</h2>
        {formData.workExperience.map((exp, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Company" value={exp.company} onChange={e => handleDynamicArrayChange(idx, 'company', e.target.value, 'workExperience')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Position" value={exp.position} onChange={e => handleDynamicArrayChange(idx, 'position', e.target.value, 'workExperience')} className="px-2 py-1 border rounded" />
            <input type="date" placeholder="Start Date" value={exp.startDate} onChange={e => handleDynamicArrayChange(idx, 'startDate', e.target.value, 'workExperience')} className="px-2 py-1 border rounded" />
            <input type="date" placeholder="End Date" value={exp.endDate} onChange={e => handleDynamicArrayChange(idx, 'endDate', e.target.value, 'workExperience')} className="px-2 py-1 border rounded" />
            <label>
              <input type="checkbox" checked={exp.currentlyWorking} onChange={e => handleDynamicArrayChange(idx, 'currentlyWorking', e.target.checked, 'workExperience')} /> Currently Working
            </label>
            <input type="text" placeholder="Description" value={exp.description} onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'workExperience')} className="px-2 py-1 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => handleAddEntry('workExperience', { company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Experience</button>

        <h2 className="text-2xl font-semibold">Projects</h2>
        {formData.projects.map((proj, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Title" value={proj.title} onChange={e => handleDynamicArrayChange(idx, 'title', e.target.value, 'projects')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Description" value={proj.description} onChange={e => handleDynamicArrayChange(idx, 'description', e.target.value, 'projects')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Technologies (comma separated)" value={proj.technologies} onChange={e => handleDynamicArrayChange(idx, 'technologies', e.target.value, 'projects')} className="px-2 py-1 border rounded" />
            <input type="url" placeholder="Project URL" value={proj.projectUrl} onChange={e => handleDynamicArrayChange(idx, 'projectUrl', e.target.value, 'projects')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Image URLs (comma separated)" value={proj.imageUrls} onChange={e => handleDynamicArrayChange(idx, 'imageUrls', e.target.value, 'projects')} className="px-2 py-1 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => handleAddEntry('projects', { title: '', description: '', technologies: '', projectUrl: '', imageUrls: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Project</button>

        <h2 className="text-2xl font-semibold">Certifications</h2>
        {formData.certifications.map((cert, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Name" value={cert.name} onChange={e => handleDynamicArrayChange(idx, 'name', e.target.value, 'certifications')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Issuer" value={cert.issuer} onChange={e => handleDynamicArrayChange(idx, 'issuer', e.target.value, 'certifications')} className="px-2 py-1 border rounded" />
            <input type="date" placeholder="Date" value={cert.date} onChange={e => handleDynamicArrayChange(idx, 'date', e.target.value, 'certifications')} className="px-2 py-1 border rounded" />
            <input type="url" placeholder="Credential URL" value={cert.credentialUrl} onChange={e => handleDynamicArrayChange(idx, 'credentialUrl', e.target.value, 'certifications')} className="px-2 py-1 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => handleAddEntry('certifications', { name: '', issuer: '', date: '', credentialUrl: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Certification</button>

        <h2 className="text-2xl font-semibold">Languages</h2>
        {formData.languages.map((lang, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Language" value={lang.language} onChange={e => handleDynamicArrayChange(idx, 'language', e.target.value, 'languages')} className="px-2 py-1 border rounded" />
            <input type="text" placeholder="Proficiency" value={lang.proficiency} onChange={e => handleDynamicArrayChange(idx, 'proficiency', e.target.value, 'languages')} className="px-2 py-1 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => handleAddEntry('languages', { language: '', proficiency: '' })} className="px-4 py-2 bg-blue-500 text-white rounded">Add Language</button>
      </div>

      <div className="text-center mt-8">
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Portfolio
        </button>
      </div>
    </form>
  );
};

export default InfoPage;
