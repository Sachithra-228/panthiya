const express = require('express');
const router = express.Router();

// Simple in-memory storage (replace with database in production)
let users = {};
let userProgress = {};

// Get user profile
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    user: users[userId],
    progress: userProgress[userId] || {}
  });
});

// Create or update user profile
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name, email, specialization, level } = req.body;
  
  users[userId] = {
    id: userId,
    name,
    email,
    specialization,
    level,
    createdAt: users[userId]?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  res.json({ message: 'User profile updated successfully', user: users[userId] });
});

// Get user progress for a specific specialization
router.get('/:userId/progress/:specializationId', (req, res) => {
  const { userId, specializationId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const progress = userProgress[userId]?.[specializationId] || {
    completedModules: [],
    currentModule: null,
    progressPercentage: 0,
    certificates: []
  };
  
  res.json(progress);
});

// Update user progress
router.post('/:userId/progress/:specializationId', (req, res) => {
  const { userId, specializationId } = req.params;
  const { moduleId, completed, progressPercentage } = req.body;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  if (!userProgress[userId]) {
    userProgress[userId] = {};
  }
  
  if (!userProgress[userId][specializationId]) {
    userProgress[userId][specializationId] = {
      completedModules: [],
      currentModule: null,
      progressPercentage: 0,
      certificates: []
    };
  }
  
  const progress = userProgress[userId][specializationId];
  
  if (completed && !progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
  }
  
  if (progressPercentage !== undefined) {
    progress.progressPercentage = progressPercentage;
  }
  
  progress.currentModule = moduleId;
  
  res.json({ 
    message: 'Progress updated successfully', 
    progress: progress 
  });
});

// CV Upload endpoint (placeholder for file upload)
router.post('/:userId/cv-upload', (req, res) => {
  const { userId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Simulate CV analysis
  const analysis = {
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
  };
  
  res.json({
    message: 'CV analyzed successfully',
    analysis: analysis
  });
});

// Generate certificate (placeholder)
router.post('/:userId/certificate/:specializationId/:moduleId', (req, res) => {
  const { userId, specializationId, moduleId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const certificate = {
    id: `cert_${Date.now()}`,
    userId,
    specializationId,
    moduleId,
    issuedAt: new Date().toISOString(),
    certificateUrl: `https://panthiya.com/certificates/${userId}/${moduleId}`,
    verificationCode: Math.random().toString(36).substring(2, 10).toUpperCase()
  };
  
  // Add certificate to user progress
  if (!userProgress[userId]) userProgress[userId] = {};
  if (!userProgress[userId][specializationId]) {
    userProgress[userId][specializationId] = { certificates: [] };
  }
  if (!userProgress[userId][specializationId].certificates) {
    userProgress[userId][specializationId].certificates = [];
  }
  
  userProgress[userId][specializationId].certificates.push(certificate);
  
  res.json({
    message: 'Certificate generated successfully',
    certificate: certificate
  });
});

// Get user certificates
router.get('/:userId/certificates', (req, res) => {
  const { userId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const allCertificates = [];
  const progress = userProgress[userId] || {};
  
  Object.values(progress).forEach(specProgress => {
    if (specProgress.certificates) {
      allCertificates.push(...specProgress.certificates);
    }
  });
  
  res.json(allCertificates);
});

module.exports = router; 