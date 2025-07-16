import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Clock,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  Play,
  Award,
  DollarSign,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useSpecialization } from '../context/SpecializationContext';

const SpecializationPage = () => {
  const { id } = useParams();
  const {
    currentSpecialization,
    fetchSpecializationById,
    fetchModules,
    fetchRoadmap,
    fetchJobs,
    loading
  } = useSpecialization();

  const [modules, setModules] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('modules');

  useEffect(() => {
    const loadSpecializationData = async () => {
      if (id) {
        await fetchSpecializationById(id);
        const [modulesData, roadmapData, jobsData] = await Promise.all([
          fetchModules(id),
          fetchRoadmap(id),
          fetchJobs(id)
        ]);
        setModules(modulesData);
        setRoadmap(roadmapData);
        setJobs(jobsData);
      }
    };

    loadSpecializationData();
  }, [id]);

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[level] || colors.Beginner;
  };

  const getGrowthColor = (growth) => {
    const colors = {
      'Very High': 'text-green-600',
      'High': 'text-blue-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-gray-600'
    };
    return colors[growth] || colors.Medium;
  };

  const tabs = [
    { id: 'modules', label: 'Learning Modules', icon: BookOpen },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin },
    { id: 'jobs', label: 'Job Opportunities', icon: Users }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!currentSpecialization) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialization not found</h2>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {currentSpecialization.name}
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-3xl">
              {currentSpecialization.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-white/80">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{modules.length} Modules</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="w-5 h-5 mr-2" />
                <span>{roadmap.length} Phase Roadmap</span>
              </div>
              <div className="flex items-center text-white/80">
                <Users className="w-5 h-5 mr-2" />
                <span>{jobs.length} Career Paths</span>
              </div>
            </div>
          </div>
          <div className="lg:ml-8 mt-6 lg:mt-0">
            <button className="btn-secondary w-full lg:w-auto">
              Start Learning Journey
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        
        {/* Learning Modules Tab */}
        {activeTab === 'modules' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Modules</h2>
              <p className="text-gray-600">
                Structured learning path from beginner to advanced levels
              </p>
            </div>
            <div className="grid gap-6">
              {modules.map((module, index) => (
                <div key={module.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {module.title}
                        </h3>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                          {module.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {module.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
                      <button className="btn-outline flex items-center justify-center">
                        <Play className="w-4 h-4 mr-2" />
                        Start Module
                      </button>
                      <button className="btn-primary flex items-center justify-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Roadmap</h2>
              <p className="text-gray-600">
                Your structured path to mastering {currentSpecialization.name}
              </p>
            </div>
            <div className="space-y-6">
              {roadmap.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {index < roadmap.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 relative z-10">
                      {phase.phase}
                    </div>
                    <div className="flex-1 card">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          Phase {phase.phase}: {phase.title}
                        </h3>
                        <div className="flex items-center text-gray-500 mt-2 lg:mt-0">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{phase.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Opportunities Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Opportunities</h2>
              <p className="text-gray-600">
                Explore career paths in {currentSpecialization.name}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job, index) => (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {job.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.growth === 'Very High' ? 'bg-green-100 text-green-800' :
                      job.growth === 'High' ? 'bg-blue-100 text-blue-800' :
                      job.growth === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.growth} Growth
                    </span>
                  </div>
                  <div className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <DollarSign className="w-5 h-5 mr-1 text-green-600" />
                    {job.salary}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className={`w-4 h-4 mr-1 ${getGrowthColor(job.growth)}`} />
                      <span>{job.growth} Demand</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Your {currentSpecialization.name} Journey?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get personalized recommendations from our AI assistant and accelerate your learning path
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/ai-assistant" className="btn-primary">
            Get AI Recommendations
          </Link>
          <Link to="/cv-analyzer" className="btn-outline">
            Analyze Your Skills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecializationPage; 