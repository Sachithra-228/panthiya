import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const CVAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const analyzeCV = () => {
    setLoading(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalysis({
        skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
        experience: 'Entry Level',
        recommendations: [
          'Consider strengthening your database skills',
          'Add more projects to your portfolio',
          'Consider learning cloud technologies'
        ],
        matchingJobs: [
          { title: 'Junior Developer', match: 85 },
          { title: 'Frontend Developer', match: 78 },
          { title: 'Full Stack Developer', match: 65 }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            CV Analyzer
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Upload your resume and get AI-powered insights about your skills and career opportunities
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Your CV</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your CV here, or click to browse
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="cv-upload"
            />
            <label htmlFor="cv-upload" className="btn-primary cursor-pointer">
              Choose File
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{file.name}</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          )}

          {file && (
            <button
              onClick={analyzeCV}
              disabled={loading}
              className="w-full mt-4 btn-primary disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze CV'}
            </button>
          )}
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Analysis Results</h2>
          
          {!analysis ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Upload a CV to see analysis results</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Detected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Experience Level</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                  {analysis.experience}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
                      <span className="text-sm text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Matching Jobs</h3>
                <div className="space-y-3">
                  {analysis.matchingJobs.map((job, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{job.title}</span>
                      <span className="text-sm text-green-600">{job.match}% match</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzerPage; 