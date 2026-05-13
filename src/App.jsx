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

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5  && h < 12) return { text: 'Good Morning',   emoji: '🌅' };
    if (h >= 12 && h < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    if (h >= 17 && h < 21) return { text: 'Good Evening',   emoji: '🌆' };
    return                         { text: 'Good Night',     emoji: '🌙' };
  };
  const greeting = getGreeting();

  // Greeting → Nav transition
  useEffect(() => {
    const t = setTimeout(() => setNavReady(true), 2600);
    return () => clearTimeout(t);
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];
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
    { id: 'projects', label: 'Work' },
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
                  <span className="nav-greeting-emoji">{greeting.emoji}</span>
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
                  <a href="mailto:pasindu@example.com" className="nav-pill-cta">Hire Me</a>
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-huge font-black mb-10 tracking-tighter leading-[1] uppercase">
                  Architecting <br />
                  <span className="text-gradient-purple">resilient infra.</span>
                </h2>
                <div className="space-y-6 text-white/70 leading-relaxed text-base md:text-lg text-justify font-light">
                  <p>
                    DevOps and Cloud Solutions Engineer operating at the intersection of software development and system architecture. Expertise includes containerizing applications with Docker, designing secure network architectures, and orchestrating full-stack environments—spanning dynamic frontends to persistent database layers. Proven ability to configure automated pipelines, manage cloud resources, and implement security best practices. Dedicated to building resilient, scalable systems that empower development teams to ship software faster and safer.
                  </p>
                </div>

                <div className="mt-12 flex gap-4">
                  <a href="https://github.com" className="social-icon-btn">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com" className="social-icon-btn">
                    <Linkedin size={20} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center items-center"
              >
                {/* Cloud Architecture Animation */}
                <div className="animation-container">
                  <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
                    <defs>
                      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Connecting Lines */}
                    {[
                      { x1: 200, y1: 100, x2: 100, y2: 250 },
                      { x1: 200, y1: 100, x2: 300, y2: 250 },
                      { x1: 100, y1: 250, x2: 300, y2: 250 },
                      { x1: 100, y1: 250, x2: 200, y2: 350 },
                      { x1: 300, y1: 250, x2: 200, y2: 350 },
                    ].map((line, i) => (
                      <motion.line
                        key={i}
                        x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                        stroke="url(#glow)" strokeWidth="1" strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    ))}

                    {/* Nodes representing Servers/Pills */}
                    {[
                      { x: 200, y: 100, label: "Cloud" },
                      { x: 100, y: 250, label: "Docker" },
                      { x: 300, y: 250, label: "AWS" },
                      { x: 200, y: 350, label: "CI/CD" }
                    ].map((node, i) => (
                      <motion.g 
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                      >
                        <circle cx={node.x} cy={node.y} r="8" fill="url(#glow)" />
                        <text x={node.x} y={node.y + 25} textAnchor="middle" fill="white" fontSize="12" className="font-mono uppercase tracking-widest opacity-50">
                          {node.label}
                        </text>
                        <circle cx={node.x} cy={node.y} r="15" stroke="url(#glow)" strokeWidth="0.5" fill="none" opacity="0.3" />
                      </motion.g>
                    ))}
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32">
          <div className="container">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                FEATURED <br />
                <span className="opacity-40">WORKS.</span>
              </h2>
              <p className="text-white/40 max-w-xs text-right hidden md:block">
                A collection of projects where design meets code seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Nexus AI", category: "Artificial Intelligence", color: "from-white/5 to-white/1" },
                { title: "Vault Pay", category: "Fintech Solution", color: "from-white/5 to-white/1" },
                { title: "Cloud Peak", category: "SaaS Dashboard", color: "from-white/5 to-white/1" },
                { title: "Aura Flow", category: "E-commerce", color: "from-white/5 to-white/1" }
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass-card overflow-hidden group h-[400px] flex flex-col justify-end p-10 relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <span className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">{project.category}</span>
                  <h3 className="text-4xl font-black mb-6">{project.title}</h3>
                  <div className="flex gap-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] border border-white/10 uppercase font-bold">Case Study</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] border border-white/10 uppercase font-bold text-white/40">Live Demo</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Footer Banner */}
        <section className="py-20">
          <div className="container">
            <div className="glass-card p-12 md:p-24 text-center rounded-[40px] border-white/10">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
                HAVE A <span className="opacity-40">CONCEPT?</span>
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
                I'm currently accepting new projects and collaborations. 
                Let's build something that stands out.
              </p>
              <a href="mailto:hello@example.com" className="btn-primary text-xl px-12 py-4">
                Estimate Project
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/30 text-xs tracking-widest uppercase font-bold">
              © 2026 Portfolio New. All Rights Reserved.
            </p>
            <div className="flex gap-10">
              <Github className="cursor-pointer hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100" size={18} />
              <Linkedin className="cursor-pointer hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100" size={18} />
              <Twitter className="cursor-pointer hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100" size={18} />
              <Mail className="cursor-pointer hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100" size={18} />
            </div>
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
    </div>
  );
}

export default App;
