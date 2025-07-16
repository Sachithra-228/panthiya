# 🎓 Panthiya Learning Platform

<div align="center">
  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**A modern full-stack educational platform with AI-powered learning recommendations**

[🚀 Live Demo](#) • [📖 Documentation](#-getting-started) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📖 **Overview**

Panthiya is a comprehensive student-focused learning platform with AI support for IT specializations including **Information Technology (IT)**, **Software Engineering (SE)**, **Data Science (DS)**, and **Interactive Media (IM)**. The platform provides personalized learning paths, career guidance, and interactive features to accelerate your tech career.

### ✨ **Key Highlights**
- 🤖 **AI-Powered Recommendations** - Smart module and career suggestions
- 🎨 **Modern Responsive UI** - Built with React and Tailwind CSS
- 📚 **4 Complete Specializations** - Each with structured learning paths
- 🎯 **Career-Focused** - Job opportunities and salary insights
- 📜 **Digital Certificates** - Earn verifiable certificates
- 🎤 **Mock Interviews** - Practice with AI interviewer
- 📄 **CV Analyzer** - Get insights on your resume

## 🚀 **Features**

### **Core Learning Features**
- ✅ **Learning Modules** - Structured content with Beginner, Intermediate, and Advanced levels
- ✅ **Learning Roadmaps** - Clear pathways for skill development with timelines
- ✅ **Job Opportunities** - Career guidance with salary ranges and growth prospects
- ✅ **Progress Tracking** - Monitor your learning journey

### **AI-Powered Tools**
- 🧠 **AI Assistant** - Personalized module and career recommendations
- 📊 **CV Analyzer** - Upload and analyze your resume for skill assessment
- 🎭 **Mock Interview** - Practice interviews with AI feedback
- 🏆 **Certificate Generator** - Earn certificates upon module completion

### **Modern UI/UX**
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Beautiful Gradients** - Modern design with smooth animations
- 🔄 **Interactive Navigation** - Intuitive sidebar and routing
- 🌓 **Professional Theme** - Consistent branding across specializations

## 🛠 **Tech Stack**

### **Frontend**
- **React 18** - Modern React with hooks and context
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting middleware
- **Body Parser** - Request body parsing

## 📁 **Project Structure**

```
Panthiya/
├── 📂 frontend/                 # React frontend application
│   ├── 📂 public/              # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/      # Reusable React components
│   │   │   └── 📂 layout/      # Layout components (Navbar, Sidebar)
│   │   ├── 📂 context/         # React context for state management
│   │   ├── 📂 pages/           # Page components
│   │   ├── 📄 App.js           # Main App component
│   │   ├── 📄 index.js         # React entry point
│   │   └── 📄 index.css        # Global styles with Tailwind
│   ├── 📄 package.json         # Frontend dependencies
│   ├── 📄 tailwind.config.js   # Tailwind configuration
│   └── 📄 postcss.config.js    # PostCSS configuration
├── 📂 backend/                 # Node.js backend API
│   ├── 📂 routes/             # API route handlers
│   │   ├── 📄 specializations.js  # Specialization data endpoints
│   │   ├── 📄 ai.js               # AI assistant endpoints
│   │   └── 📄 users.js            # User management endpoints
│   ├── 📄 server.js           # Express server setup
│   └── 📄 package.json        # Backend dependencies
├── 📄 package.json            # Root package.json for scripts
└── 📄 README.md              # Project documentation
```

## 🚀 **Getting Started**

### **Prerequisites**
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

### **Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/panthiya-learning-platform.git
   cd panthiya-learning-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run install-deps
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/api/health

### **Alternative Setup**

Run servers separately:
```bash
# Backend only
npm run server

# Frontend only  
npm run client
```

## 🎨 **Specializations**

<table>
<tr>
<td width="50%">

### 💻 **Information Technology (IT)**
- 🔧 Computing fundamentals & networking
- 📚 IT Fundamentals → Network Administration → Cloud Technologies
- 💼 IT Support Specialist, Network Administrator, Cloud Architect

### 🔬 **Data Science (DS)**  
- 📊 Data analysis & machine learning
- 📚 Data Analysis → Python for Data Science → Machine Learning
- 💼 Data Analyst, Data Scientist, ML Engineer

</td>
<td width="50%">

### 💻 **Software Engineering (SE)**
- 🏗️ Building robust software systems
- 📚 Programming Fundamentals → Web Development → Software Architecture  
- 💼 Junior Developer, Full Stack Developer, Software Architect

### 🎨 **Interactive Media (IM)**
- 🎭 Digital design & multimedia development
- 📚 Digital Design → Web & Multimedia → UX Design & Interactive Systems
- 💼 UI/UX Designer, Web Designer, Multimedia Developer

</td>
</tr>
</table>

## 🤖 **AI Assistant Features**

The AI Assistant provides:
- 🎯 **Module Recommendations** based on experience level and interests
- 💼 **Job Suggestions** matching your skills and career goals  
- 🛤️ **Learning Path Guidance** for optimal skill development
- 💡 **Career Advice** tailored to your specialization

## 📚 **API Documentation**

### **Specializations Endpoints**
```
GET    /api/specializations              # Get all specializations
GET    /api/specializations/:id          # Get specific specialization
GET    /api/specializations/:id/modules  # Get modules for specialization
GET    /api/specializations/:id/roadmap  # Get learning roadmap
GET    /api/specializations/:id/jobs     # Get job opportunities
```

### **AI Assistant Endpoints**
```
POST   /api/ai/recommend-module          # Get module recommendations
POST   /api/ai/suggest-jobs              # Get job suggestions
```

### **User Management Endpoints**
```
GET    /api/users/:userId                          # Get user profile
POST   /api/users/:userId                          # Create/update user
POST   /api/users/:userId/cv-upload                # Upload and analyze CV
POST   /api/users/:userId/certificate/:specId/:moduleId  # Generate certificate
```

## 🔧 **Development Scripts**

```bash
# Install all dependencies (frontend + backend)
npm run install-deps

# Start both development servers
npm run dev

# Start backend only
npm run server

# Start frontend only  
npm run client

# Build frontend for production
npm run build
```

## 🚀 **Deployment**

### **Frontend Deployment**
1. Build the production version:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `build` folder to:
   - **Vercel** (Recommended)
   - **Netlify** 
   - **GitHub Pages**

### **Backend Deployment**
1. Deploy to platforms like:
   - **Railway**
   - **Heroku** 
   - **DigitalOcean**
   - **AWS EC2**

2. Set environment variables and run:
   ```bash
   npm install && npm start
   ```

## 🎯 **Learning Path Structure**

Each specialization follows a proven learning methodology:

1. **🏗️ Foundation Phase** - Core concepts and fundamental skills
2. **🚀 Development Phase** - Practical applications and hands-on projects  
3. **⭐ Specialization Phase** - Advanced topics and industry expertise
4. **🏆 Certification Phase** - Industry-recognized credentials and portfolio

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💻 Make your changes**
4. **✅ Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
6. **🔀 Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 **Authors & Contributors**

- **Your Name** - *Initial work* - [@yourusername](https://github.com/yourusername)

See also the list of [contributors](../../contributors) who participated in this project.

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **Tailwind Labs** - For the beautiful Tailwind CSS
- **Lucide** - For the gorgeous icon library
- **Express.js Team** - For the robust backend framework
- **All Contributors** - For making this project better

## 📞 **Support**

If you have any questions or need help:

- 📧 **Email**: your.email@example.com
- 🐛 **Issues**: [Create an issue](../../issues)
- 💬 **Discussions**: [Join the discussion](../../discussions)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/yourusername)

[🔝 Back to Top](#-panthiya-learning-platform)

</div> 