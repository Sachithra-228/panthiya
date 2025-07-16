import React from 'react';
import { Award, Download, Eye, Calendar } from 'lucide-react';

const CertificatesPage = () => {
  const certificates = [
    {
      id: 1,
      title: 'Programming Fundamentals',
      specialization: 'Software Engineering',
      issuedDate: '2024-01-15',
      verificationCode: 'SE-PF-2024-001',
      status: 'Valid'
    },
    {
      id: 2,
      title: 'Web Development Basics',
      specialization: 'Software Engineering',
      issuedDate: '2024-02-20',
      verificationCode: 'SE-WD-2024-002',
      status: 'Valid'
    },
    {
      id: 3,
      title: 'Data Analysis Fundamentals',
      specialization: 'Data Science',
      issuedDate: '2024-03-10',
      verificationCode: 'DS-DA-2024-003',
      status: 'Valid'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Your Certificates
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            View and download your earned certificates from completed learning modules
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-20">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
          <p className="text-gray-600 mb-6">Complete learning modules to earn your first certificate</p>
          <button className="btn-primary">Start Learning</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {cert.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {cert.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {cert.specialization}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Issued: {new Date(cert.issuedDate).toLocaleDateString()}
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Verification: {cert.verificationCode}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 btn-outline text-sm flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button className="flex-1 btn-primary text-sm flex items-center justify-center">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage; 