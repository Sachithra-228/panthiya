import React, { useState } from 'react';
import { 
  Brain, 
  Send, 
  BookOpen, 
  Briefcase, 
  Lightbulb,
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useSpecialization } from '../context/SpecializationContext';

const AIAssistantPage = () => {
  const { getModuleRecommendation, getJobSuggestions } = useSpecialization();
  const [activeSection, setActiveSection] = useState('module');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Module recommendation form state
  const [moduleForm, setModuleForm] = useState({
    level: '',
    interests: [],
    timeCommitment: ''
  });

  // Job suggestion form state
  const [jobForm, setJobForm] = useState({
    skills: [],
    experience: '',
    interests: [],
    location: ''
  });

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const interestOptions = ['Programming', 'Data Analysis', 'Networking', 'Cloud Computing', 'AI/ML', 'Cybersecurity', 'Web Development', 'Mobile Development'];
  const timeCommitments = ['1-2 hours/week', '3-5 hours/week', '6-10 hours/week', '10+ hours/week'];
  const skillOptions = ['JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS', 'React', 'Node.js', 'AWS', 'Git', 'Linux'];

  const handleModuleFormChange = (field, value) => {
    setModuleForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobFormChange = (field, value) => {
    setJobForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (form, setForm, field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleModuleRecommendation = async () => {
    setLoading(true);
    try {
      const recommendation = await getModuleRecommendation(moduleForm.level, moduleForm.interests);
      setResults(recommendation);
    } catch (error) {
      console.error('Error getting module recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSuggestion = async () => {
    setLoading(true);
    try {
      const suggestions = await getJobSuggestions(jobForm.skills, jobForm.experience, jobForm.interests);
      setResults(suggestions);
    } catch (error) {
      console.error('Error getting job suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            AI Learning Assistant
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get personalized recommendations for your learning journey and career path using our intelligent assistant
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8 max-w-md mx-auto">
        <button
          onClick={() => setActiveSection('module')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeSection === 'module'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Module Finder
        </button>
        <button
          onClick={() => setActiveSection('job')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeSection === 'job'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Career Guide
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="card">
          {activeSection === 'module' ? (
            <>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Find Your Perfect Module</h2>
                  <p className="text-gray-600 text-sm">Tell us about your goals and preferences</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your current experience level?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {experienceLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleModuleFormChange('level', level)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all duration-200 ${
                          moduleForm.level === level
                            ? 'bg-purple-50 border-purple-200 text-purple-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What topics interest you? (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleArrayToggle(moduleForm, setModuleForm, 'interests', interest)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all duration-200 ${
                          moduleForm.interests.includes(interest)
                            ? 'bg-purple-50 border-purple-200 text-purple-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Commitment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How much time can you dedicate?
                  </label>
                  <select
                    value={moduleForm.timeCommitment}
                    onChange={(e) => handleModuleFormChange('timeCommitment', e.target.value)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select time commitment</option>
                    {timeCommitments.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleModuleRecommendation}
                  disabled={!moduleForm.level || moduleForm.interests.length === 0 || loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get AI Recommendation
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Career Path Advisor</h2>
                  <p className="text-gray-600 text-sm">Get job suggestions based on your profile</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What skills do you have? (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleArrayToggle(jobForm, setJobForm, 'skills', skill)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all duration-200 ${
                          jobForm.skills.includes(skill)
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of experience
                  </label>
                  <select
                    value={jobForm.experience}
                    onChange={(e) => handleJobFormChange('experience', e.target.value)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="2-5">2-5 years (Mid Level)</option>
                    <option value="5+">5+ years (Senior Level)</option>
                  </select>
                </div>

                {/* Career Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career interests (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleArrayToggle(jobForm, setJobForm, 'interests', interest)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all duration-200 ${
                          jobForm.interests.includes(interest)
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleJobSuggestion}
                  disabled={jobForm.skills.length === 0 || !jobForm.experience || loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Career Suggestions
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Results */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Lightbulb className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
              <p className="text-gray-600 text-sm">Personalized suggestions for you</p>
            </div>
          </div>

          {!results ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                Fill out the form to get personalized AI recommendations
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeSection === 'module' ? (
                <>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">
                      Recommended Learning Path
                    </h3>
                    <p className="text-purple-700 text-sm mb-3">
                      {results.recommendation || "Based on your preferences, we recommend starting with foundational modules and gradually progressing to more advanced topics."}
                    </p>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      <span>View Full Roadmap</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {(results.modules || [
                      { title: "Programming Fundamentals", level: "Beginner", duration: "4 weeks" },
                      { title: "Web Development Basics", level: "Intermediate", duration: "6 weeks" }
                    ]).map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{module.duration}</p>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {module.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Career Advice
                    </h3>
                    <p className="text-blue-700 text-sm">
                      {results.advice || "Based on your skills and interests, you're well-positioned for several exciting career paths in technology."}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {(results.jobs || [
                      { title: "Frontend Developer", match: "85%", salary: "$65,000 - $85,000" },
                      { title: "Full Stack Developer", match: "78%", salary: "$70,000 - $95,000" }
                    ]).map((job, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {job.match} Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{job.salary}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage; 