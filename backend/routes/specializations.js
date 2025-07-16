const express = require('express');
const router = express.Router();

// Sample data for specializations
const specializationsData = {
  it: {
    id: 'it',
    name: 'Information Technology',
    description: 'Master the fundamentals of computing, networking, and system administration',
    color: 'blue',
    icon: 'computer',
    modules: [
      {
        id: 'it-basics',
        title: 'IT Fundamentals',
        level: 'Beginner',
        duration: '4 weeks',
        description: 'Basic concepts of IT, computer systems, and networking',
        topics: ['Computer Hardware', 'Operating Systems', 'Basic Networking', 'IT Security Basics']
      },
      {
        id: 'networking',
        title: 'Network Administration',
        level: 'Intermediate',
        duration: '6 weeks',
        description: 'Learn to configure and manage computer networks',
        topics: ['TCP/IP', 'Routing & Switching', 'Network Security', 'Wireless Networks']
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Technologies',
        level: 'Advanced',
        duration: '8 weeks',
        description: 'Modern cloud platforms and services',
        topics: ['AWS/Azure/GCP', 'Container Technologies', 'DevOps', 'Cloud Security']
      }
    ],
    roadmap: [
      { phase: 1, title: 'Foundation', duration: '2 months', topics: ['Basic IT', 'Hardware', 'OS'] },
      { phase: 2, title: 'Networking', duration: '2 months', topics: ['Networking', 'Security', 'Protocols'] },
      { phase: 3, title: 'Specialization', duration: '3 months', topics: ['Cloud', 'DevOps', 'Advanced Security'] },
      { phase: 4, title: 'Certification', duration: '1 month', topics: ['CompTIA', 'Cisco', 'Microsoft'] }
    ],
    jobs: [
      { title: 'IT Support Specialist', salary: '$35,000 - $50,000', growth: 'High' },
      { title: 'Network Administrator', salary: '$55,000 - $75,000', growth: 'Medium' },
      { title: 'Cloud Architect', salary: '$90,000 - $130,000', growth: 'Very High' },
      { title: 'Cybersecurity Analyst', salary: '$70,000 - $100,000', growth: 'Very High' }
    ]
  },
  se: {
    id: 'se',
    name: 'Software Engineering',
    description: 'Build robust software systems and applications using modern development practices',
    color: 'green',
    icon: 'code',
    modules: [
      {
        id: 'programming-basics',
        title: 'Programming Fundamentals',
        level: 'Beginner',
        duration: '6 weeks',
        description: 'Learn core programming concepts and your first language',
        topics: ['Programming Logic', 'Variables & Data Types', 'Control Structures', 'Functions']
      },
      {
        id: 'web-development',
        title: 'Web Development',
        level: 'Intermediate',
        duration: '8 weeks',
        description: 'Build modern web applications with frontend and backend',
        topics: ['HTML/CSS/JavaScript', 'React/Vue', 'Node.js', 'Databases']
      },
      {
        id: 'software-architecture',
        title: 'Software Architecture',
        level: 'Advanced',
        duration: '10 weeks',
        description: 'Design scalable and maintainable software systems',
        topics: ['Design Patterns', 'Microservices', 'System Design', 'Performance Optimization']
      }
    ],
    roadmap: [
      { phase: 1, title: 'Programming Basics', duration: '3 months', topics: ['Python/Java', 'Algorithms', 'Git'] },
      { phase: 2, title: 'Web Development', duration: '3 months', topics: ['Frontend', 'Backend', 'Databases'] },
      { phase: 3, title: 'Advanced Topics', duration: '4 months', topics: ['Architecture', 'Testing', 'DevOps'] },
      { phase: 4, title: 'Specialization', duration: '2 months', topics: ['Mobile', 'AI/ML', 'Cloud Native'] }
    ],
    jobs: [
      { title: 'Junior Developer', salary: '$45,000 - $65,000', growth: 'High' },
      { title: 'Full Stack Developer', salary: '$70,000 - $95,000', growth: 'Very High' },
      { title: 'Software Architect', salary: '$110,000 - $150,000', growth: 'High' },
      { title: 'DevOps Engineer', salary: '$85,000 - $120,000', growth: 'Very High' }
    ]
  },
  ds: {
    id: 'ds',
    name: 'Data Science',
    description: 'Extract insights from data using statistical analysis and machine learning',
    color: 'purple',
    icon: 'chart',
    modules: [
      {
        id: 'data-analysis',
        title: 'Data Analysis Fundamentals',
        level: 'Beginner',
        duration: '5 weeks',
        description: 'Learn to analyze and visualize data effectively',
        topics: ['Statistics Basics', 'Excel/Google Sheets', 'Data Visualization', 'Descriptive Analytics']
      },
      {
        id: 'python-data-science',
        title: 'Python for Data Science',
        level: 'Intermediate',
        duration: '8 weeks',
        description: 'Use Python libraries for data manipulation and analysis',
        topics: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks']
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        level: 'Advanced',
        duration: '12 weeks',
        description: 'Build predictive models and AI systems',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'Model Deployment']
      }
    ],
    roadmap: [
      { phase: 1, title: 'Math & Statistics', duration: '2 months', topics: ['Statistics', 'Linear Algebra', 'Calculus'] },
      { phase: 2, title: 'Programming', duration: '2 months', topics: ['Python', 'R', 'SQL'] },
      { phase: 3, title: 'Data Analysis', duration: '3 months', topics: ['EDA', 'Visualization', 'Storytelling'] },
      { phase: 4, title: 'Machine Learning', duration: '4 months', topics: ['ML Algorithms', 'Deep Learning', 'MLOps'] }
    ],
    jobs: [
      { title: 'Data Analyst', salary: '$50,000 - $70,000', growth: 'High' },
      { title: 'Data Scientist', salary: '$80,000 - $120,000', growth: 'Very High' },
      { title: 'ML Engineer', salary: '$95,000 - $140,000', growth: 'Very High' },
      { title: 'Data Engineer', salary: '$85,000 - $125,000', growth: 'Very High' }
    ]
  },
  im: {
    id: 'im',
    name: 'Interactive Media',
    description: 'Create engaging digital experiences through multimedia design, web development, and user interaction',
    color: 'orange',
    icon: 'palette',
    modules: [
      {
        id: 'design-fundamentals',
        title: 'Digital Design Fundamentals',
        level: 'Beginner',
        duration: '4 weeks',
        description: 'Learn core principles of digital design and visual communication',
        topics: ['Design Principles', 'Color Theory', 'Typography', 'Adobe Creative Suite']
      },
      {
        id: 'web-multimedia',
        title: 'Web & Multimedia Development',
        level: 'Intermediate',
        duration: '6 weeks',
        description: 'Build interactive websites and multimedia applications',
        topics: ['HTML5/CSS3', 'JavaScript Animations', 'Video Production', 'Audio Editing']
      },
      {
        id: 'ux-interaction',
        title: 'UX Design & Interactive Systems',
        level: 'Advanced',
        duration: '8 weeks',
        description: 'Design user-centered interactive experiences and interfaces',
        topics: ['User Research', 'Prototyping', 'Interaction Design', 'Usability Testing']
      }
    ],
    roadmap: [
      { phase: 1, title: 'Design Foundation', duration: '2 months', topics: ['Design Principles', 'Creative Software', 'Visual Arts'] },
      { phase: 2, title: 'Web Development', duration: '2 months', topics: ['Frontend Development', 'Responsive Design', 'CSS Frameworks'] },
      { phase: 3, title: 'Multimedia Production', duration: '3 months', topics: ['Video Editing', 'Animation', '3D Graphics'] },
      { phase: 4, title: 'UX Specialization', duration: '2 months', topics: ['User Experience', 'Interaction Design', 'Prototyping'] }
    ],
    jobs: [
      { title: 'UI/UX Designer', salary: '$55,000 - $80,000', growth: 'Very High' },
      { title: 'Web Designer', salary: '$45,000 - $65,000', growth: 'High' },
      { title: 'Multimedia Developer', salary: '$60,000 - $85,000', growth: 'High' },
      { title: 'Interaction Designer', salary: '$70,000 - $95,000', growth: 'Very High' }
    ]
  }
};

// Get all specializations
router.get('/', (req, res) => {
  const specializations = Object.values(specializationsData).map(spec => ({
    id: spec.id,
    name: spec.name,
    description: spec.description,
    color: spec.color,
    icon: spec.icon
  }));
  res.json(specializations);
});

// Get specific specialization by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const specialization = specializationsData[id];
  
  if (!specialization) {
    return res.status(404).json({ error: 'Specialization not found' });
  }
  
  res.json(specialization);
});

// Get modules for a specific specialization
router.get('/:id/modules', (req, res) => {
  const { id } = req.params;
  const specialization = specializationsData[id];
  
  if (!specialization) {
    return res.status(404).json({ error: 'Specialization not found' });
  }
  
  res.json(specialization.modules);
});

// Get roadmap for a specific specialization
router.get('/:id/roadmap', (req, res) => {
  const { id } = req.params;
  const specialization = specializationsData[id];
  
  if (!specialization) {
    return res.status(404).json({ error: 'Specialization not found' });
  }
  
  res.json(specialization.roadmap);
});

// Get job opportunities for a specific specialization
router.get('/:id/jobs', (req, res) => {
  const { id } = req.params;
  const specialization = specializationsData[id];
  
  if (!specialization) {
    return res.status(404).json({ error: 'Specialization not found' });
  }
  
  res.json(specialization.jobs);
});

module.exports = router; 