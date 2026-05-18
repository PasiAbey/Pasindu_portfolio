import React, { useState, useEffect } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight, ExternalLink, Code2, Cpu, Globe } from 'lucide-react';

function App() {
  const roles = ['DevOps Engineer', 'Cloud Solution Engineer'];
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navReady, setNavReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      title: "Cinema Hub",
      description: "A state-of-the-art movie streaming platform featuring a high-performance microservices backend, seamless video playback, and a cinematic user interface.",
      tech: ["React", "Go", "Docker"],
      moreTech: 4,
      status: "LIVE & OPERATIONAL",
      image: "/Pasindu_portfolio/projects/cinema.png",
      github: "https://github.com/PasiAbey"
    },
    {
      title: "AI Career Coach",
      description: "An intelligent platform that helps users land their dream job through AI-simulated interviews, smart resume building, and real-time feedback.",
      tech: ["Next.js", "OpenAI", "Zod"],
      moreTech: 5,
      status: "ALL SYSTEMS OPERATIONAL",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      github: "https://github.com/PasiAbey"
    },
    {
      title: "Cloud Orchestrator",
      description: "A comprehensive infrastructure management tool to automatically scale, provision, and deploy robust microservices across multi-cloud environments.",
      tech: ["Kubernetes", "AWS", "Terraform"],
      moreTech: 3,
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
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    { id: 'contact', label: 'Contact' },
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
                  {/* Placeholder for future image */}
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
                {projectsData.map((project, i) => (
                  <motion.div
                    key={i}
                    layoutId={`project-${project.title}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="project-slide glass-card overflow-hidden group flex flex-col p-0 relative h-auto"
                  >
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
                          {project.tech.map((t, idx) => (
                            <span key={idx} className="tech-tag">{t}</span>
                          ))}
                          {project.moreTech && (
                            <span className="tech-tag text-white/50">+{project.moreTech}</span>
                          )}
                        </div>
                      </div>
                      
                      <a href="#" onClick={(e) => { e.preventDefault(); setSelectedProject(project); }} className="project-details-btn">
                        View Details <ArrowRight size={14} />
                      </a>

                    </div>
                  </motion.div>
                ))}
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

        {/* Project Expanded Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
            >
              {/* Overlay */}
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedProject(null)}
              />
              
              {/* Expanded Card */}
              <motion.div
                layoutId={`project-${selectedProject.title}`}
                className="glass-card overflow-hidden flex flex-col relative w-full max-w-4xl max-h-[90vh] z-10"
              >
                {/* Image Header area */}
                <div className="relative h-64 sm:h-[450px] w-full shrink-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 transition-colors cursor-pointer z-50"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                  </button>
                </div>

                {/* Content area */}
                <div className="p-8 sm:p-12 flex flex-col overflow-y-auto custom-scrollbar bg-[#111]">
                  <h3 className="text-3xl sm:text-5xl font-black font-heading text-white mb-6">
                    {selectedProject.title}
                  </h3>
                  
                  <p className="text-white/80 font-roboto text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                    <br /><br />
                    This project showcases advanced architectural decisions including microservices orchestration, scalable deployments, and comprehensive containerization. With continuous integration and high-availability setups, it's built to handle significant loads effortlessly.
                  </p>
                  
                  <div className="mb-10">
                    <h4 className="text-white/40 text-sm font-bold tracking-widest uppercase mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((t, idx) => (
                        <span key={idx} className="tech-tag text-base px-4 py-2">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-auto pt-6 border-t border-white/10">
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                    >
                      <Github size={20} className="mr-2"/> View Source
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}

export default App;
