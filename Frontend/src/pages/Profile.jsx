import  { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Edit3,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Heart,
  Settings,
  ExternalLink,
  Sparkles,
  Code,
  Eye
} from 'lucide-react';

const Profile = () => {
  const { userInfo, authUser, GetInfo } = useAuthStore();
  const navigate = useNavigate();

  const handleUpdateRoute = () => {
    navigate('/update_info');
  };
  const {id} = useParams();

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  useEffect(() => {
    GetInfo(id);
  }, [userInfo, authUser, GetInfo]);

  // If no user info, show empty state
  if (!userInfo) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">No Profile Information</h2>
          <p className="text-gray-400 mb-8">
            You haven't created your profile yet. Add your information to get started.
          </p>
          <button
            onClick={() => navigate('/portfolio_info')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Profile Overview</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back,
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}{userInfo?.personalInfo?.fullName || authUser?.name || 'User'}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your portfolio information and settings
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="relative mb-6">
                  {userInfo?.personalInfo?.profilePictureUrl ? (
                    <img
                      src={userInfo.personalInfo.profilePictureUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto border-4 border-purple-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {userInfo?.personalInfo?.fullName || 'User Name'}
                </h2>
                <p className="text-gray-400 mb-4">
                  {userInfo?.personalInfo?.email || authUser?.email}
                </p>
                
                <button
                  onClick={handleUpdateRoute}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  Update Profile
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {userInfo?.personalInfo?.phone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{userInfo.personalInfo.phone}</span>
                    </div>
                  )}
                  {userInfo?.personalInfo?.address && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{userInfo.personalInfo.address}</span>
                    </div>
                  )}
                  {userInfo?.personalInfo?.website && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={userInfo.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  Social Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {userInfo?.personalInfo?.github && (
                    <a href={userInfo.personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Github className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                  {userInfo?.personalInfo?.linkedin && (
                    <a href={userInfo.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Linkedin className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                  {userInfo?.personalInfo?.twitter && (
                    <a href={userInfo.personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Twitter className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                  {userInfo?.socialLinks?.facebook && (
                    <a href={userInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Facebook className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                  {userInfo?.socialLinks?.instagram && (
                    <a href={userInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Instagram className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                  {userInfo?.socialLinks?.youtube && (
                    <a href={userInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Youtube className="w-4 h-4 text-gray-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              {userInfo?.about && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-400" />
                    About
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{userInfo.about}</p>
                </div>
              )}

              {/* Skills Section */}
              {userInfo?.skills && userInfo.skills.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userInfo.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Section */}
              {userInfo?.services && userInfo.services.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userInfo.services.map((service, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">{service.title}</h4>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience Section */}
              {userInfo?.workExperience && userInfo.workExperience.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {userInfo.workExperience.map((exp, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{exp.position}</h4>
                            <p className="text-purple-400 text-sm">{exp.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                            </p>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-300 text-sm">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {userInfo?.education && userInfo.education.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    Education
                  </h3>
                  <div className="space-y-4">
                    {userInfo.education.map((edu, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{edu.degree}</h4>
                            <p className="text-purple-400 text-sm">{edu.institution}</p>
                            <p className="text-gray-400 text-sm">{edu.fieldOfStudy}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </p>
                            {edu.grade && (
                              <p className="text-green-400 text-sm">{edu.grade}</p>
                            )}
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-300 text-sm">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {userInfo?.projects && userInfo.projects.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userInfo.projects.map((project, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        {project.imageUrls && project.imageUrls[0] && (
                          <img
                            src={project.imageUrls[0]}
                            alt={project.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                        )}
                        <h4 className="font-semibold text-white mb-2">{project.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {userInfo?.certifications && userInfo.certifications.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {userInfo.certifications.map((cert, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-white">{cert.name}</h4>
                            <p className="text-purple-400 text-sm">{cert.issuer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-sm">{formatDate(cert.date)}</p>
                            {cert.credentialUrl && (
                              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
                                View Credential
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {userInfo?.languages && userInfo.languages.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-purple-400" />
                    Languages
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {userInfo.languages.map((lang, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{lang.language}</span>
                          <span className="text-purple-400 text-sm">{lang.proficiency}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests Section */}
              {userInfo?.interests && userInfo.interests.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-400" />
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userInfo.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info Section */}
              {userInfo?.additionalInfo && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-400" />
                    Additional Information
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{userInfo.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
