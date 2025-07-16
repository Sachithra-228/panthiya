import React, { useState } from 'react';
import { MessageSquare, Play, Clock, User, Mic, Video } from 'lucide-react';

const MockInterviewPage = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);

  const specializations = [
    { id: 'it', name: 'Information Technology' },
    { id: 'se', name: 'Software Engineering' },
    { id: 'ds', name: 'Data Science' },
    { id: 'im', name: 'Interactive Media' }
  ];

  const levels = ['Entry Level', 'Mid Level', 'Senior Level'];

  const sampleQuestions = [
    "Tell me about yourself and your background in technology.",
    "What interests you most about this field?",
    "Describe a challenging project you've worked on.",
    "How do you stay updated with new technologies?",
    "Where do you see yourself in 5 years?"
  ];

  const startInterview = () => {
    setInterviewStarted(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Mock Interview Practice
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Practice your interview skills with AI-powered mock interviews tailored to your specialization
          </p>
        </div>
      </div>

      {!interviewStarted ? (
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Setup Your Mock Interview</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your specialization
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select specialization</option>
                  {specializations.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all duration-200 ${
                        selectedLevel === level
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What to expect:</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• 5-10 interview questions tailored to your level</li>
                  <li>• Real-time feedback on your responses</li>
                  <li>• Tips for improvement after each question</li>
                  <li>• Overall performance summary</li>
                </ul>
              </div>

              <button
                onClick={startInterview}
                disabled={!selectedSpecialization || !selectedLevel}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Mock Interview
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interview Interface */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Interview in Progress</h2>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>15:30</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16 text-indigo-600" />
                </div>
                <p className="text-gray-600">AI Interviewer</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-900 font-medium">
                  "Tell me about yourself and your background in technology."
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Mic className="w-6 h-6 text-red-600" />
                </button>
                <button className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Video className="w-6 h-6 text-blue-600" />
                </button>
                <button className="btn-primary">
                  Next Question
                </button>
              </div>
            </div>
          </div>

          {/* Progress & Tips */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Question 1 of 5</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Sample Questions</h3>
              <div className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    {question}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Use specific examples from your experience</li>
                <li>• Stay positive and confident</li>
                <li>• Ask questions about the role and company</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage; 