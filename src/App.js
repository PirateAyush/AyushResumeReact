import React, { useState, useEffect } from 'react';
import profileImage from './images/profile.jpeg';
import { Linkedin, Mail, Phone } from "lucide-react";

const useTypewriter = (texts, speed = 100, deleteSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration]);

  return displayText;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const typedText = useTypewriter([
    'Software Engineer I at ImpactGuru',
    'Laravel & Django Expert',
    'Manual Operations Automator Using Cron & Jobs',
    'React Specialist'
  ], 50, 35, 1500);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm shadow-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className={`font-bold text-gray-900 transition-all duration-300 ${
              scrolled ? 'text-xl' : 'text-2xl'
            }`}>
              Ayush More
            </h1>
            
            <ul className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`font-medium transition-all duration-300 relative group ${
                      activeSection === item.toLowerCase()
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                      activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-lg"
                >
                  Hire Me
                </a>
              </li>
            </ul>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <ul className="md:hidden mt-4 space-y-2 bg-gray-50 rounded-lg p-4">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="block text-gray-700 hover:text-blue-600 py-2 hover:translate-x-2 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold mb-4">Hello, I'm</p>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Ayush More
              </h2>
              
              <div className="text-2xl text-gray-600 mb-6 h-20 flex items-center">
                <span className="inline-block">{typedText}</span>
                <span className="inline-block w-0.5 h-8 bg-blue-600 ml-1 animate-pulse"></span>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Full Stack Developer specializing in Laravel, Django, and React. 
                Currently pursuing MSc in Computer Science with expertise in building 
                scalable web applications and automation systems.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10">View Projects</span>
                </a>
                
                <a 
                  href="#contact" 
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all transform hover:scale-105"
                >
                  Contact Me
                </a>
                
                {/* Download Resume Button */}
                <a 
                  href="/Resume-Ayush-More.pdf" 
                  download="Ayush_More_Resume.pdf"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:shadow-xl relative overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10">Download Resume</span>
                  <svg 
                    className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>

                <div className="flex gap-4 mt-8">
                  {[
                    { href: 'https://www.linkedin.com/in/ayush-more-5b5b09250', icon: <Linkedin size={20} />, label: 'LinkedIn' },
                    { href: 'mailto:ayushmorebb@gmail.com', icon: <Mail size={20} />, label: 'Email' },
                    { href: 'tel:+919324843109', icon: <Phone size={20} />, label: 'Phone' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target={social.href.includes('http') ? '_blank' : undefined}
                      rel={social.href.includes('http') ? 'noopener noreferrer' : undefined}
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 hover:rotate-12"
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <img 
                    src={profileImage} 
                    alt="Ayush More" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="flex items-center justify-center h-full text-gray-500 text-lg">Ayush More</span>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600 rounded-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPROVED STATS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50" id="stats">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Impact & Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering measurable business value through automation and innovation at ImpactGuru
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: '💰',
                number: '₹7 Crore',
                label: 'Value Automated',
                description: 'Automated reallocation of unutilized Care Points from marketing campaigns, recovering financial value that was previously unaccounted for',
                color: 'bg-green-50 border-green-200 hover:border-green-400'
              },
              { 
                icon: '📋',
                number: '33,000+',
                label: 'Policies Automated',
                description: 'Designed automated donor policy issuance system with Email, SMS & WhatsApp communication, eliminating manual processing entirely',
                color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
              },
              { 
                icon: '⚡',
                number: '2 Hours',
                label: 'Daily Time Saved',
                description: 'Automated settlement completion & receipt generation using RPay, Easebuzz & banking APIs, saving operations team 2+ hours per member daily',
                color: 'bg-purple-50 border-purple-200 hover:border-purple-400'
              },
              { 
                icon: '🎯',
                number: '100%',
                label: 'Error Elimination',
                description: 'Built OCR-driven billing dashboard for Trust & Safety team, achieving zero manual errors in billing data extraction and reconciliation',
                color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`group relative ${stat.color} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Professional Timeline
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Aug 2023</h4>
                <p className="text-gray-600 text-sm">Joined ImpactGuru as Software Engineer I</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">2.5+ Years</h4>
                <p className="text-gray-600 text-sm">Building automation systems & reducing operational overhead</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Present</h4>
                <p className="text-gray-600 text-sm">Pursuing MSc CS while delivering enterprise solutions</p>
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {[
              { label: 'Process Automation', icon: '⚙️' },
              { label: 'API Integration', icon: '🔗' },
              { label: 'OCR & Data Extraction', icon: '📊' },
              { label: 'Webhook Systems', icon: '🔔' }
            ].map((skill, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Software Engineer & Problem Solver
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm currently working as Software Engineer I at ImpactGuru, where I've automated 
                critical workflows worth ₹7 Crores and enabled 33,000+ automated policy issuances. 
                My work focuses on building scalable automation systems that eliminate manual processes 
                and improve operational efficiency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Currently pursuing MSc in Computer Science from HSNC University with specialization 
                in DevOps, Machine Learning, and Cloud Computing. I completed my BSc with a CGPA of 9.41, 
                demonstrating strong academic excellence alongside practical experience.
              </p>
              
              <div className="space-y-3 pt-4">
                {[
                  { label: 'Name', value: 'Ayush More' },
                  { label: 'Email', value: 'ayushmorebb@gmail.com' },
                  { label: 'Phone', value: '+91 9324843109' },
                  { label: 'Location', value: 'Mumbai, Maharashtra' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center group hover:translate-x-2 transition-transform"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    <span className="text-gray-700">
                      <strong>{item.label}:</strong> {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
              <div className="space-y-6">
                {[
                  { 
                    degree: 'MSc Computer Science', 
                    school: 'HSNC University, Mumbai', 
                    period: '2024 - 2026 (Pursuing)',
                    details: 'Coursework: DevOps, Machine Learning, Computational Linguistics, Big Data, Cloud Computing',
                    color: 'border-blue-600'
                  },
                  { 
                    degree: 'BSc Computer Science', 
                    school: 'HSNC University, Mumbai', 
                    period: '2021 - 2024',
                    details: 'CGPA: 9.41',
                    color: 'border-gray-300'
                  },
                  { 
                    degree: 'HSC', 
                    school: 'Kishinchand Chellaram College, Mumbai', 
                    period: '2020 - 2021',
                    details: 'Percentage: 87.55%',
                    color: 'border-gray-300'
                  },
                  { 
                    degree: 'SSC', 
                    school: 'Balmohan Vidyamandir, Mumbai', 
                    period: '2018 - 2019',
                    details: 'Percentage: 90.80%',
                    color: 'border-gray-300'
                  }
                ].map((edu, index) => (
                  <div 
                    key={index}
                    className={`border-l-4 ${edu.color} pl-4 hover:pl-6 transition-all group cursor-pointer`}
                  >
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                    <p className="text-sm text-blue-600 font-semibold">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Software Engineer I</h3>
                  <p className="text-lg text-blue-600 font-semibold">ImpactGuru</p>
                  <p className="text-gray-600">Mumbai, Maharashtra</p>
                </div>
                <div className="text-gray-600 font-medium mt-2 md:mt-0 bg-blue-50 px-4 py-2 rounded-lg">
                  Aug 2023 - Present
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'DMP CP Pool Movement',
                    desc: 'Automated reallocation of ₹7 Crore worth of unutilized Care Points from DMP marketing campaigns to a central Pool Campaign, ensuring full CP utilization which was previously unrecognized and unaccounted for in financial tallies.'
                  },
                  {
                    title: 'Auto Donor Policy Issuance',
                    desc: 'Designed an automated policy issuance system that sent communications via Email, SMS, and WhatsApp using GupShup Webhook. Captured donor consent and integrated it into the system. Enabled 33,000 automated policy issuances and handled 1,300 donor denials effectively without manual intervention.'
                  },
                  {
                    title: 'Settlement Auto Completion & Receipt Generation',
                    desc: 'Automated end-to-end settlement workflow using RPay, Easebuzz, and banking APIs to fetch UTRs and mark requests as complete. Receipt generation and dispatch were also automated, saving 2 hours daily per operations team member and eliminating human error.'
                  },
                  {
                    title: 'Billing Module',
                    desc: 'Developed an OCR-driven billing dashboard for the Trust & Safety team to extract, track, and reconcile billing data, improving visibility into outstanding balances and streamlining settlement mapping.'
                  }
                ].map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-start group hover:bg-blue-50 p-3 rounded-lg transition-all"
                  >
                    <span className="text-blue-600 mr-3 mt-1 flex-shrink-0 text-xl group-hover:scale-125 transition-transform">▹</span>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="group-hover:text-blue-600 transition-colors">{achievement.title}:</strong> {achievement.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'E-Commerce Website',
                desc: 'Full-stack e-commerce platform with product management, shopping cart, and secure payment processing capabilities.',
                gradient: 'from-blue-500 to-blue-600',
                frontend: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery'],
                backend: ['PHP', 'Laravel', 'MySQL', 'AJAX']
              },
              {
                title: 'House Help Connect',
                desc: 'Platform connecting homeowners with verified house help professionals, featuring ML-based matching and recommendation system.',
                gradient: 'from-purple-500 to-purple-600',
                frontend: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery'],
                backend: ['Python', 'Django', 'MySQL', 'Pandas', 'NumPy', 'Sklearn']
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-white/50 text-lg relative z-10">{project.title}</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Frontend:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.frontend.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white transition-all cursor-pointer transform hover:scale-110"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Backend:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.backend.map((tech, i) => (
                        <span 
                          key={i} 
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer transform hover:scale-110 ${
                            index === 0 
                              ? 'bg-green-100 text-green-700 hover:bg-green-600 hover:text-white' 
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Skills Grid - 4 columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Languages', 
                icon: '💻', 
                skills: ['PHP', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'], 
                color: 'blue' 
              },
              { 
                title: 'Frameworks', 
                icon: '🚀', 
                skills: ['Laravel', 'Django', 'React', 'jQuery', 'Bootstrap'], 
                color: 'green' 
              },
              { 
                title: 'Tools', 
                icon: '🛠️', 
                skills: ['Git', 'Redis', 'Jira', 'Postman', 'VI Commands', 'Hookdeck'], 
                color: 'purple' 
              },
              { 
                title: 'Technologies', 
                icon: '⚙️', 
                skills: ['API', 'Webhooks', 'GupShup', 'OCR', 'Cron Jobs', 'AJAX'], 
                color: 'orange' 
              }
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2 hover:scale-125 transition-transform inline-block">
                    {category.icon}
                  </span> 
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className={`px-3 py-1.5 bg-${category.color}-50 text-${category.color}-700 rounded-lg text-sm font-medium hover:bg-${category.color}-600 hover:text-white transition-all cursor-pointer transform hover:scale-110`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Financial & Business Operations */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-green-200">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">💰</span>
              <h3 className="text-xl font-bold text-gray-900">Financial & Business Operations</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Settlements', 
                'Refunds', 
                'Reconciliation', 
                'Revenue Management', 
                'Payouts', 
                'UTR Processing',
                'Financial Automation'
              ].map((concept) => (
                <span 
                  key={concept} 
                  className="px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-sm border border-green-200"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Methodologies & Concepts */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📋</span>
              <h3 className="text-xl font-bold text-gray-900">Methodologies & Best Practices</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Agile Methodology', 
                'OOP', 
                'RESTful APIs',
                'Database Optimization',
                'SOLID Principle',
                'Design Patterns',
                'Code Review'
              ].map((concept) => (
                <span 
                  key={concept} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-700 hover:text-white transition-all cursor-pointer transform hover:scale-110"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Domain Expertise */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🎯</span>
              <h3 className="text-xl font-bold text-gray-900">Domain Expertise</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { 
                  area: 'Healthcare Tech', 
                  items: ['Policy Management', 'Donor Systems', 'Trust & Safety'] 
                },
                { 
                  area: 'Automation', 
                  items: ['Workflow Automation', 'Email/SMS/WhatsApp', 'Data Extraction'] 
                },
                { 
                  area: 'FinTech', 
                  items: ['Payment Processing', 'Banking APIs', 'Financial Reconciliation'] 
                },
                { 
                  area: 'Data Management', 
                  items: ['OCR Systems', 'Data Migration', 'Reporting Dashboards'] 
                }
              ].map((domain, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-blue-700 mb-2">{domain.area}</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.items.map((item) => (
                      <span 
                        key={item}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Achievements */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Blind Coding Competition', desc: 'First Prize - College Event', color: 'from-blue-50 to-blue-100' },
              { icon: '🤸', title: 'Kabaddi Champion', desc: 'State Level Player', color: 'from-green-50 to-green-100' },
              { icon: '🎤', title: 'Rapping Competition', desc: 'First Prize - Inter College', color: 'from-purple-50 to-purple-100' }
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${achievement.color} rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group`}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-700">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg mt-4">
              Let's connect! I'm always open to discussing new projects and opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '📧', title: 'Email', value: 'ayushmorebb@gmail.com', href: 'mailto:ayushmorebb@gmail.com' },
              { icon: '📱', title: 'Phone', value: '+91 9324843109', href: 'tel:+919324843109' },
              { icon: '💼', title: 'LinkedIn', value: 'linkedin.com/in/AyushMore', href: 'https://www.linkedin.com/in/ayush-more-5b5b09250' }
            ].map((contact, index) => (
              <a 
                key={index}
                href={contact.href}
                target={contact.href.includes('http') ? '_blank' : undefined}
                rel={contact.href.includes('http') ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 group"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <span className="text-xl group-hover:scale-125 transition-transform inline-block">
                      {contact.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {contact.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{contact.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">📍 Based in Mumbai, Maharashtra</p>
            <a 
              href="mailto:ayushmorebb@gmail.com"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              Send Me an Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">© 2025 Ayush More. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/ayush-more-5b5b09250" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:ayushmorebb@gmail.com"
              className="text-gray-400 hover:text-white transition-all transform hover:scale-110"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
