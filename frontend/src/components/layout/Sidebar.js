import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Computer, 
  Code, 
  BarChart3, 
  Database,
  Palette,
  Home,
  Brain,
  FileText,
  Award,
  MessageSquare
} from 'lucide-react';
import { useSpecialization } from '../../context/SpecializationContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { specializations } = useSpecialization();

  const isActive = (path) => location.pathname === path;

  const getSpecializationIcon = (iconName) => {
    const icons = {
      computer: Computer,
      code: Code,
      chart: BarChart3,
      database: Database,
      palette: Palette
    };
    const IconComponent = icons[iconName] || Computer;
    return <IconComponent className="w-5 h-5" />;
  };

  const getSpecializationColor = (color) => {
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colorClasses[color] || colorClasses.blue;
  };

  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'AI Assistant',
      path: '/ai-assistant',
      icon: Brain
    },
    {
      name: 'CV Analyzer',
      path: '/cv-analyzer',
      icon: FileText
    },
    {
      name: 'Certificates',
      path: '/certificates',
      icon: Award
    },
    {
      name: 'Mock Interview',
      path: '/mock-interview',
      icon: MessageSquare
    }
  ];

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:block hidden`}>
      
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-600" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-600" />
        )}
      </button>

      <div className="flex flex-col h-full overflow-y-auto">
        
        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-2">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h3>
          )}
          
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-primary-600 bg-primary-50 border border-primary-200'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Specializations Section */}
        <div className="px-3 py-4 border-t border-gray-200 flex-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Specializations
            </h3>
          )}
          
          <div className="space-y-2">
            {specializations.map((spec) => {
              const active = isActive(`/specialization/${spec.id}`);
              const colorClasses = getSpecializationColor(spec.color);
              
              return (
                <Link
                  key={spec.id}
                  to={`/specialization/${spec.id}`}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 border ${
                    active
                      ? colorClasses
                      : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? spec.name : ''}
                >
                  <div className="flex-shrink-0">
                    {getSpecializationIcon(spec.icon)}
                  </div>
                  {!isCollapsed && (
                    <div className="ml-3">
                      <div className="font-medium">{spec.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {spec.description}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="px-3 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Panthiya Learning Platform
              <br />
              v1.0.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 