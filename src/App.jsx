import React, { useState, useEffect, useRef } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight, ExternalLink, Code2, Cpu, Globe } from 'lucide-react';
import profileImg from './assets/Main_versions.png';

function App() {
  const roles = ['DevOps Engineer', 'Cloud Solution Engineer'];
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navReady, setNavReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dx = (x / rect.width) - 0.5;
    const dy = (y / rect.height) - 0.5;
    
    container.style.setProperty('--dx', dx);
    container.style.setProperty('--dy', dy);
  };

  const handleMouseLeave = (e) => {
    const container = e.currentTarget;
    container.style.removeProperty('--dx');
    container.style.removeProperty('--dy');
  };

  const projectsData = [
    {
      title: "Skill-Quest",
      description: "A scalable, containerized full-stack application leveraging Reinforcement Learning algorithms to personalize educational gamification.",
      fullDescription: (
        <div className="flex flex-col gap-4 text-sm md:text-base mt-2">
          <p>
            SkillQuest is a comprehensive, full-stack educational platform designed to maximize student engagement through dynamic gamification and adaptive learning systems. Going beyond traditional Learning Management Systems (LMS), SkillQuest integrates a custom Reinforcement Learning (RL) agent that continuously monitors student performance, automatically adjusting task difficulty and tailoring the learning experience in real-time.
          </p>

          <div>
            <strong className="text-white text-[0.95rem]">Architectural Approach</strong>
            <p className="mt-1 text-white/70">
              Designed with scalability and modern DevOps practices in mind, the platform operates on a containerized microservices architecture. An Nginx API Gateway acts as the central orchestrator, routing traffic seamlessly between a static React client, decoupled Node.js backend services, and a dedicated Python machine learning API. The entire ecosystem is containerized using Docker and Docker Compose, enabling isolated development, zero-CORS configuration, and one-command deployment.
            </p>
          </div>

          <div>
            <strong className="text-white text-[0.95rem]">Key Features</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
              <li><strong>Adaptive Reinforcement Learning:</strong> Utilizes a Deep Q-Network (DQN) algorithm served via a dedicated Python API to track user states, calculate reward functions, and intelligently adapt educational content to the user's skill level.</li>
              <li><strong>Advanced Gamification Engine:</strong> Features a robust milestone system that calculates and awards badges, tracks consecutive login streaks, and manages user scores to incentivize consistent learning habits.</li>
              <li><strong>Dynamic Plan Generation:</strong> Automatically generates customized study plans, quizzes, and training sessions based on real-time analytics and user progress.</li>
              <li><strong>Secure Identity & Data Management:</strong> Implements secure user authentication using JWT and bcrypt, with data integrity maintained through raw, highly optimized MySQL SQL migrations rather than heavy ORMs.</li>
            </ul>
          </div>

          <div>
            <strong className="text-white text-[0.95rem]">Technical Stack</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
              <li><strong>Frontend:</strong> React, Vite</li>
              <li><strong>Backend Services:</strong> Node.js, Express.js</li>
              <li><strong>Machine Learning:</strong> Python, Reinforcement Learning (DQN)</li>
              <li><strong>Database:</strong> MySQL (mysql2)</li>
              <li><strong>DevOps & Infrastructure:</strong> Docker, Docker Compose, Nginx API Gateway</li>
            </ul>
          </div>

          <div>
            <strong className="text-white text-[0.95rem]">Project Impact</strong>
            <p className="mt-1 text-white/70">
              SkillQuest demonstrates a strong command of modern software engineering principles, bridging the gap between complex machine learning algorithms and robust, user-facing web development. It showcases the ability to architect decoupled microservices, manage containerized deployments, and design engaging, data-driven user experiences.
            </p>
          </div>
        </div>
      ),
      tech: ["React", "Python", "Docker", "Git", "Node.js"],
      status: "LIVE & OPERATIONAL",
      image: "/Pasindu_portfolio/projects/skillquest.png",
      github: "https://github.com/PasiAbey/Project-Skill-Quest"
    },
    {
      title: "CINEMA - Streaming Platform",
      description: "A highly scalable Cinema Streaming Platform built entirely on a modern, cloud-native microservices architecture using Docker, Nginx, and Microsoft Azure.",
      fullDescription: (
        <div className="flex flex-col gap-4 text-sm md:text-base mt-2">
          <p>
            Designed and deployed a highly scalable Cinema Streaming Platform built entirely on a modern microservices architecture. The objective of this project was to engineer a robust, cloud-native ecosystem capable of handling media delivery, secure user sessions, and seamless content management while maintaining high availability and zero-downtime deployments.
          </p>

          <div>
            <strong className="text-white text-[0.95rem]">Tech Stack & Tools</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
              <li><strong>Architecture:</strong> Microservices, API Gateway Pattern</li>
              <li><strong>Containerization & Orchestration:</strong> Docker, Docker Compose</li>
              <li><strong>Web Server / Reverse Proxy:</strong> Nginx</li>
              <li><strong>Cloud Infrastructure:</strong> Microsoft Azure</li>
              <li><strong>Frontend/Backend:</strong> React, Node.js, Python</li>
            </ul>
          </div>

          <div>
            <strong className="text-white text-[0.95rem]">Architecture & Implementation</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
              <li><strong>Microservices Ecosystem:</strong> Decoupled standard streaming processes into isolated, independently deployable microservices to ensure that a failure in one system (e.g., billing or reviews) does not disrupt active video streams.</li>
              <li><strong>Container Orchestration:</strong> Containerized all individual backend services and databases using Docker to guarantee environment consistency across development, testing, and production. Engineered a local development cluster using Docker Compose for rapid, streamlined testing.</li>
              <li><strong>API Gateway & Traffic Routing:</strong> Configured Nginx to act as the central API Gateway and reverse proxy. This setup securely routes incoming client requests to the appropriate backend containers, balances network load, and obscures the internal microservice network from the public internet.</li>
              <li><strong>Cloud Deployment & Security:</strong> Implemented a strict security model for intra-service communication and deployed the final containerized architecture to Azure, leveraging its cloud infrastructure for global scalability.</li>
            </ul>
          </div>

          <div>
            <strong className="text-white text-[0.95rem]">Key Outcomes & Features</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
              <li>Engineered a highly resilient system where individual services can scale horizontally based on specific traffic demands.</li>
              <li>Eliminated "it works on my machine" bugs through strict Docker containerization and comprehensive local cluster setup scripts.</li>
              <li>Authored comprehensive technical documentation, including architecture diagrams, security models, and deployment READMEs to ensure the codebase remains maintainable and accessible for future contributors.</li>
            </ul>
          </div>
        </div>
      ),
      tech: ["Docker", "Nginx", "Azure", "React", "Node.js", "Python"],
      status: "ALL SYSTEMS OPERATIONAL",
      image: "/Pasindu_portfolio/projects/cinema_title.png",
      github: "https://github.com/PasiAbey/Cinema---Movie-Streaming-Platform"
    },
    {
      title: "Cloud Orchestrator",
      description: "A comprehensive infrastructure management tool to automatically scale, provision, and deploy robust microservices across multi-cloud environments.",
      tech: ["Kubernetes", "AWS", "Terraform", "Docker", "Go", "ArgoCD"],
      status: "DEPLOYED & SCALING",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      github: "https://github.com/PasiAbey"
    }
  ];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return { text: 'Good Morning', emoji: '🌅' };
    if (h >= 12 && h < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    return { text: 'Good Evening', emoji: '🌆' };
  };
  const greeting = getGreeting();

  // Greeting → Nav transition
  useEffect(() => {
    const t = setTimeout(() => setNavReady(true), 2600);
    return () => clearTimeout(t);
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = 'home';
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on scroll
  useEffect(() => {
    if (!selectedProject) return;

    const handleScroll = () => {
      setSelectedProject(null);
    };

    // Listen to scroll events on the window to close the modal
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  // Bidirectional typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const speed = isDeleting ? 50 : 90;
    const t = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) setIsPaused(true);
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, isPaused, roleIndex]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Works' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="relative font-sans text-white">
      {/* Background Layer */}
      <InteractiveBackground />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>

        {/* ===== PILL NAVBAR ===== */}
        <nav className="nav-wrapper">
          {/* Centered pill — scales from its own center outward */}
          <motion.div
            className="nav-pill"
            layoutId="nav-pill"
            layout
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ originX: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!navReady ? (
                <motion.div
                  key="greeting"
                  className="nav-greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <span>{greeting.text}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="nav-links"
                  className="nav-links-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className={`nav-pill-link${activeSection === link.id ? ' active' : ''}`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a href="#contact" className="nav-pill-cta">Hire Me</a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">

          {/* Hero Section */}
          <section id="home" className="h-screen flex items-center justify-center">
            <div className="container text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <h1 className="font-giant font-black tracking-tighter flex items-center justify-center flex-nowrap whitespace-nowrap gap-10">
                  <span className="liquid-glass-white" data-text="Hi, I'm">Hi, I'm</span>
                  <span className="text-white">Pasindu</span>
                </h1>

                <div className="mt-12 role-text-container">
                  <p className="role-typewriter">
                    {displayText}
                    <span className="typewriter-caret">|</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative flex justify-center items-center"
                >
                  <div 
                    className="about-image-container"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img 
                      src={profileImg} 
                      alt="Pasindu Abeysundara" 
                      className="about-image"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-huge font-black mb-16 tracking-tighter leading-[1] uppercase whitespace-nowrap">
                    <span className="text-white">Automate.</span>
                    <span className="liquid-glass-white mx-4" data-text="Scale.">Scale.</span>
                    <span className="text-white">Deploy.</span>
                  </h2>
                  <div className="space-y-8 text-white/70 leading-relaxed text-base md:text-lg font-light font-roboto">
                    <p>
                      Hi, I’m Pasindu. I am a Cloud and DevOps Engineer specializing in architecting scalable microservices, container orchestration, and automating deployment workflows. From building comprehensive streaming architectures using Docker and Azure to bridging the gap between development and operations, I am passionate about creating resilient, highly available infrastructure.
                    </p>
                    <p>
                      I am focused on leveraging my skills in remote, international environments to help global teams build and scale robust systems.
                    </p>
                  </div>

                  <div className="mt-12 flex gap-4">
                    <a href="https://github.com/PasiAbey" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/pasiabey" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Technical Skills Section */}
          <section id="skills" className="py-32 border-y border-white/5 bg-white/[0.01]">
            <div className="container mb-16">
              <div className="flex justify-center">
                <h2 className="text-huge font-black tracking-tighter leading-[1] uppercase whitespace-nowrap">
                  <span className="text-white">Technical</span>{" "}
                  <span className="liquid-glass-white ml-4" data-text="Skills.">Skills.</span>
                </h2>
              </div>
            </div>

            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-content">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" className="tech-icon" />
                      <span className="tech-name">Docker</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="tech-icon" />
                      <span className="tech-name">AWS</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" alt="Azure" className="tech-icon" />
                      <span className="tech-name">Azure</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" className="tech-icon" />
                      <span className="tech-name">Kubernetes</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" alt="Terraform" className="tech-icon" />
                      <span className="tech-name">Terraform</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" className="tech-icon" />
                      <span className="tech-name">Git</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" alt="GitLab" className="tech-icon" />
                      <span className="tech-name">GitLab</span>
                    </div>
                    <div className="tech-item group">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="tech-icon github-logo-adjust" />
                      <span className="tech-name">GitHub</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-32">
            <div className="container">
              <div className="flex justify-center mb-16">
                <h2 className="text-huge font-black tracking-tighter leading-[1] uppercase whitespace-nowrap">
                  <span className="text-white">Featured</span>{" "}
                  <span className="liquid-glass-white ml-4" data-text="Works.">Works.</span>
                </h2>
              </div>

              <div className="projects-slider no-scrollbar">
                {projectsData.map((project, i) => {
                  const isSelected = selectedProject?.title === project.title;
                  return (
                  <motion.div
                    key={i}
                    layoutId={`project-${project.title}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={isSelected ? {} : { y: -10 }}
                    className="project-slide glass-card overflow-hidden group flex flex-col p-0 relative h-auto"
                  >
                    <div style={{ opacity: isSelected ? 0 : 1, transition: "opacity 0.3s ease", display: "flex", flexDirection: "column", height: "100%" }}>
                      {/* Image Header area */}
                      <div className="project-header">
                        <img
                          src={project.image}
                          alt={project.title}
                        />
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-github-btn"
                        >
                          <Github size={14} /> Open in Github
                        </a>
                      </div>

                      {/* Content area - Card Layout */}
                      <div className="project-content">
                        <div className="project-header-row">
                          <h3 className="project-title">
                            {project.title}
                          </h3>
                        </div>
                        
                        <p className="project-desc">
                          {project.description}
                        </p>
                        
                        <div className="project-tech-section">
                          <h4 className="project-tech-title">Technologies</h4>
                          <div className="project-tech-list">
                            {project.tech.slice(0, 3).map((t, idx) => (
                              <span key={idx} className="tech-tag">{t}</span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="tech-tag text-white/50">+{project.tech.length - 3}</span>
                            )}
                          </div>
                        </div>
                        
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelectedProject(project); }} className="project-details-btn">
                          View Details <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )})}
              </div>
            </div>

            {/* Github CTA Banner */}
            <div className="container mt-24">
              <div className="glass-card github-cta-banner group">
                <Github className="github-cta-bg-icon" />
                
                <div className="github-cta-overlay"></div>
                
                <div className="github-cta-content">
                  <h2 className="github-cta-title">
                    <span className="text-white">Look for</span>{" "}
                    <span className="liquid-glass-white" data-text="More Projects?">More Projects?</span>
                  </h2>
                  <p className="github-cta-desc">
                    Explore my complete repositories on GitHub to see more of my open-source contributions, experimental builds, and architectural designs.
                  </p>
                </div>
                
                <a href="https://github.com/PasiAbey" target="_blank" rel="noopener noreferrer" className="btn-primary github-cta-btn">
                  <Github size={20} className="mr-3" /> Visit Github <ArrowRight className="ml-3 github-cta-btn-arrow transition-transform" size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-32 border-t border-white/5 bg-white/[0.01]">
            <div className="container">
              <div className="flex justify-center mb-16">
                <h2 className="text-huge font-black tracking-tighter leading-[1] uppercase whitespace-nowrap">
                  <span className="text-white">Education</span>{" "}
                  <span className="liquid-glass-white ml-4" data-text="History.">History.</span>
                </h2>
              </div>

              <div className="education-timeline">
                {/* Timeline vertical bar */}
                <div className="timeline-line"></div>

                {/* Timeline Items */}
                <div className="timeline-item">
                  {/* Bullet indicator */}
                  <div className="timeline-dot"></div>
                  
                  <div className="glass-card education-card current-education-card">
                    <div className="education-info">
                      <span className="education-date">2022 - Present</span>
                      <h3 className="education-title">Bachelor of Science in Information Technology</h3>
                      <p className="education-details">Focus on DevOps & Cloud Technologies</p>
                    </div>
                    <div className="education-institute">
                      <span className="institute-name">Rajarata University of Sri Lanka</span>
                      <span className="institute-grade">Undergraduate</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  {/* Bullet indicator */}
                  <div className="timeline-dot"></div>
                  
                  <div className="glass-card education-card">
                    <div className="education-info">
                      <span className="education-date">2018 - 2020</span>
                      <h3 className="education-title">G.C.E. Advanced Level</h3>
                      <p className="education-details">Technology Stream</p>
                    </div>
                    <div className="education-institute">
                      <span className="institute-name">Galahitiyawa Central College</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Footer Banner */}
          <section id="contact" className="py-20">
            <div className="container">
              <div className="contact-grid">
                
                {/* Left Side: Text */}
                <div className="contact-text-col">
                  <h2 className="text-huge font-black tracking-tighter leading-[1] uppercase whitespace-nowrap mb-6">
                    <span className="text-white">Get in</span>{" "}
                    <span className="liquid-glass-white ml-4" data-text="Touch.">Touch.</span>
                  </h2>
                  <p className="contact-desc">
                    I'm always interested in hearing about new projects and opportunities.<br />
                    Drop me a message!
                  </p>
                </div>

                {/* Right Side: Form */}
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Write your message here" rows="5"></textarea>
                  </div>
                  <button type="submit" className="contact-submit-btn">
                    Send Message
                  </button>
                </form>

              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-white/5">
            <div className="container text-center">
              <p className="text-white/30 tracking-widest uppercase" style={{ fontSize: '0.68rem', fontWeight: 400, paddingBottom: '2rem' }}>
                © 2026 Pasindu Abeysundara. All rights reserved.
              </p>
            </div>
          </footer>
        </main>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white/30 z-[60] origin-left"
          style={{ scaleX: 0 }}
          id="scroll-progress"
        />
      </motion.div>

        {/* Project Expanded Modal - outside main layout for correct stacking */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Overlay & Card Container */}
              <div 
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 cursor-pointer"
                onClick={() => setSelectedProject(null)}
              >
                {/* Overlay Background */}
                <motion.div 
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                
                {/* Expanded Card */}
                <motion.div
                  key="modal"
                  layoutId={`project-${selectedProject.title}`}
                  className="glass-card group relative shadow-2xl cursor-default"
                  style={{ width: "90vw", maxWidth: "648px", maxHeight: "90vh", margin: 0, display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                {/* Image Header area */}
                <div className="project-header expanded-header" style={{ height: "333px", flexShrink: 0 }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{ objectFit: "contain", backgroundColor: "rgba(0,0,0,0.5)" }}
                  />
                </div>

                <div className="project-content" style={{ flex: "none", height: "calc(90vh - 333px)", maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
                  <div className="project-header-row">
                    <h3 className="project-title">
                      {selectedProject.title}
                    </h3>
                  </div>
                  
                  <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: "1.6", marginBottom: "1rem" }}>
                    {selectedProject.fullDescription || selectedProject.description}
                  </div>
                  
                  <div className="project-tech-section">
                    <h4 className="project-tech-title">Technologies</h4>
                    <div className="project-tech-list">
                      {selectedProject.tech.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="project-details-btn" style={{ marginTop: "1rem" }}>
                    Open in Github <Github size={14} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            </div>
            </>
          )}
        </AnimatePresence>
    </div>
  );
}

export default App;
