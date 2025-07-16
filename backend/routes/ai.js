const express = require('express');
const router = express.Router();

// Simple AI assistant logic (can be enhanced with actual AI API integration)
const aiResponses = {
  moduleRecommendations: {
    beginner: [
      'Start with IT Fundamentals to build a strong foundation',
      'Programming Fundamentals is perfect for beginners in Software Engineering',
      'Data Analysis Fundamentals will introduce you to the world of data',
      'Database Fundamentals is essential for Information Management'
    ],
    intermediate: [
      'Network Administration will enhance your IT skills',
      'Web Development is the next step in your software journey',
      'Python for Data Science will boost your analytical capabilities',
      'Information Systems will expand your management knowledge'
    ],
    advanced: [
      'Cloud Technologies for advanced IT specialization',
      'Software Architecture for senior development roles',
      'Machine Learning for cutting-edge data science',
      'Data Governance for enterprise information management'
    ]
  },
  jobSuggestions: {
    it: ['IT Support Specialist', 'Network Administrator', 'Cloud Architect', 'Cybersecurity Analyst'],
    se: ['Junior Developer', 'Full Stack Developer', 'Software Architect', 'DevOps Engineer'],
    ds: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Data Engineer'],
    im: ['Database Administrator', 'Business Analyst', 'Information Architect', 'Data Governance Manager']
  }
};

// AI Assistant endpoint for module recommendations
router.post('/recommend-module', (req, res) => {
  const { userInterests, currentLevel, specialization } = req.body;
  
  try {
    let recommendation = '';
    
    // Simple logic based on user level
    if (currentLevel === 'beginner' || !currentLevel) {
      recommendation = aiResponses.moduleRecommendations.beginner[
        Math.floor(Math.random() * aiResponses.moduleRecommendations.beginner.length)
      ];
    } else if (currentLevel === 'intermediate') {
      recommendation = aiResponses.moduleRecommendations.intermediate[
        Math.floor(Math.random() * aiResponses.moduleRecommendations.intermediate.length)
      ];
    } else {
      recommendation = aiResponses.moduleRecommendations.advanced[
        Math.floor(Math.random() * aiResponses.moduleRecommendations.advanced.length)
      ];
    }

    // Add personalization based on interests
    let personalizedResponse = recommendation;
    if (userInterests && userInterests.includes('programming')) {
      personalizedResponse += ' Given your interest in programming, focus on hands-on coding practice.';
    }
    if (userInterests && userInterests.includes('analytics')) {
      personalizedResponse += ' Your analytical mindset will be valuable in this module.';
    }
    if (userInterests && userInterests.includes('systems')) {
      personalizedResponse += ' Your systems thinking will help you excel in this area.';
    }

    res.json({
      recommendation: personalizedResponse,
      confidence: 0.85,
      suggestedSpecialization: specialization || 'it',
      nextSteps: [
        'Start with the recommended module',
        'Complete all hands-on exercises',
        'Join our community discussions',
        'Take the module assessment'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating recommendation' });
  }
});

// AI Assistant endpoint for job suggestions
router.post('/suggest-jobs', (req, res) => {
  const { userInterests, skills, preferredSpecialization } = req.body;
  
  try {
    const specialization = preferredSpecialization || 'it';
    const suggestedJobs = aiResponses.jobSuggestions[specialization] || aiResponses.jobSuggestions.it;
    
    // Score jobs based on user interests and skills
    const jobRecommendations = suggestedJobs.map(job => {
      let score = Math.random() * 0.3 + 0.7; // Base score between 0.7-1.0
      
      // Adjust score based on interests
      if (userInterests) {
        if (userInterests.includes('leadership') && job.includes('Manager')) score += 0.1;
        if (userInterests.includes('coding') && job.includes('Developer')) score += 0.1;
        if (userInterests.includes('analytics') && job.includes('Analyst')) score += 0.1;
        if (userInterests.includes('systems') && job.includes('Architect')) score += 0.1;
      }
      
      return {
        title: job,
        matchScore: Math.min(score, 1.0),
        reasons: [
          'Matches your skill level',
          'Aligns with your interests',
          'High growth potential',
          'Good salary prospects'
        ]
      };
    });

    // Sort by match score
    jobRecommendations.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      recommendations: jobRecommendations,
      specialization: specialization,
      totalJobs: jobRecommendations.length,
      advice: `Based on your profile, focus on developing skills in ${specialization.toUpperCase()} for the best career opportunities.`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating job suggestions' });
  }
});

// General AI chat endpoint
router.post('/chat', (req, res) => {
  const { message, context } = req.body;
  
  try {
    let response = '';
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      response = "Great! I'd recommend starting with the fundamentals of your chosen specialization. What interests you most: IT, Software Engineering, Data Science, or Information Management?";
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      response = "The tech industry offers amazing career opportunities! Each specialization has its own unique career paths. Would you like me to suggest jobs based on your interests?";
    } else if (lowerMessage.includes('difficult') || lowerMessage.includes('hard')) {
      response = "Don't worry! Every expert was once a beginner. Start with basic modules, practice regularly, and join our community for support. You've got this!";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
      response = "Most modules take 4-12 weeks depending on complexity. The key is consistent daily practice - even 30 minutes a day makes a big difference!";
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('money')) {
      response = "Tech careers offer excellent earning potential! Entry-level positions start around $35-50K, while senior roles can reach $100K+. The exact salary depends on your specialization and location.";
    } else {
      response = "I'm here to help you with your learning journey! Ask me about module recommendations, career paths, or any specific questions about our specializations.";
    }

    res.json({
      response: response,
      timestamp: new Date().toISOString(),
      suggestions: [
        "Recommend a module for me",
        "What jobs are available in my field?",
        "How long does it take to complete a specialization?",
        "What should I learn first?"
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing chat message' });
  }
});

// Get AI assistant capabilities
router.get('/capabilities', (req, res) => {
  res.json({
    features: [
      'Module Recommendations',
      'Career Path Guidance',
      'Job Market Insights',
      'Learning Plan Creation',
      'Skill Assessment',
      'Progress Tracking'
    ],
    endpoints: {
      'recommend-module': 'POST - Get personalized module recommendations',
      'suggest-jobs': 'POST - Get job suggestions based on interests',
      'chat': 'POST - General AI assistant conversation'
    },
    version: '1.0.0'
  });
});

module.exports = router; 