import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Computer, 
  Code, 
  BarChart3, 
  Database,
  Palette,
  Brain,
  FileText,
  Award,
  MessageSquare,
  Star,
  Users,
  BookOpen,
  Target
} from 'lucide-react';
import { useSpecialization } from '../context/SpecializationContext';

const HomePage = () => {
  const { specializations, loading } = useSpecialization();

  const getSpecializationIcon = (iconName) => {
    const icons = {
      computer: Computer,
      code: Code,
      chart: BarChart3,
      database: Database,
      palette: Palette
    };
    const IconComponent = icons[iconName] || Computer;
    return <IconComponent className="w-8 h-8" />;
  };

  const getSpecializationGradient = (color) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return gradients[color] || gradients.blue;
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized recommendations and smart guidance through your learning journey',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Structured Roadmaps',
      description: 'Follow clear, step-by-step learning paths designed by industry experts',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates that showcase your skills to employers',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Career Opportunities',
      description: 'Discover job opportunities tailored to your skills and interests',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Learning' },
    { number: '50+', label: 'Learning Modules' },
    { number: '4', label: 'Specializations' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex flex-col items-center mb-6">
              <img 
                src="/images/class.png" 
                alt="Class Logo" 
                className="w-20 h-20 object-contain mb-4"
              />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Master IT Skills with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  AI-Powered Learning
                </span>
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Choose your specialization, follow structured roadmaps, and accelerate your career 
              in Information Technology, Software Engineering, Data Science, or Interactive Media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-assistant"
                className="btn-secondary text-lg px-8 py-3 inline-flex items-center"
              >
                Get Started with AI
                <Brain className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="#specializations"
                className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 inline-flex items-center"
              >
                Explore Specializations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four comprehensive specializations designed to take you from beginner to professional
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specializations.map((spec) => (
                <Link
                  key={spec.id}
                  to={`/specialization/${spec.id}`}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${getSpecializationGradient(spec.color)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {getSpecializationIcon(spec.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {spec.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {spec.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium">
                    Explore Path
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Panthiya?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern learning tools and AI-powered features to accelerate your growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who are already building their future in tech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ai-assistant"
              className="btn-secondary text-lg px-8 py-3 inline-flex items-center"
            >
              Start Learning Today
              <BookOpen className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/cv-analyzer"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 inline-flex items-center"
            >
              Analyze Your Skills
              <FileText className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 