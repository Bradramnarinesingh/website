'use client';

import { useState } from 'react';
import Image from 'next/image';
import CountdownTimer from './components/CountdownTimer';
import RollingNumber from './components/RollingNumber';
import PricingTierCard from './components/PricingTierCard';
import './components/SupportSection.css'; // <-- Import the new stylesheet
import { motion } from 'framer-motion';
import AnimatedSection from './components/AnimatedSection';
import { heroTextVariants, staggerContainerVariants } from './components/animations';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Hamburger Menu */}
      <div className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
      
      {/* Mobile slide-in menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#tiers" onClick={closeMobileMenu}>DONATE</a></li>
          <li><a href="#progress" onClick={closeMobileMenu}>PROGRESS</a></li>
          <li><a href="#impact" onClick={closeMobileMenu}>IMPACT</a></li>
          <li><a href="#benefits" onClick={closeMobileMenu}>BENEFITS</a></li>
        </ul>
      </div>

      <header>
        <nav className="container">
          <div className="logo-container">
            <div className="logo">BF</div>
            <h3>BeaYOUtiful Foundation</h3>
          </div>
          <ul className="desktop-nav">
            <li><a href="#tiers">DONATE</a></li>
            <li><a href="#progress">PROGRESS</a></li>
            <li><a href="#impact">IMPACT</a></li>
            <li><a href="#benefits">BENEFITS</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Decorative Background Elements */}
        <div className="decorative-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          
          {/* SVG Gradient Blobs */}
          <div className="gradient-blobs">
            <svg className="blob blob-1" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 107, 53, 0.1)" />
                  <stop offset="100%" stopColor="rgba(232, 84, 88, 0.1)" />
                </linearGradient>
              </defs>
              <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,89.9,-16.3,88.7,-0.9C87.4,14.6,82.4,29.2,74.1,42.1C65.8,55,54.2,66.2,40.8,73.8C27.4,81.4,12.2,85.4,-3.1,91.1C-18.4,96.8,-36.8,104.2,-50.4,96.8C-64,89.4,-72.8,67.2,-77.9,45.8C-83,24.4,-84.4,3.8,-81.2,-15.2C-78,-34.2,-70.2,-51.6,-58.4,-59.8C-46.6,-68,-30.8,-67,-15.7,-70.8C-0.6,-74.6,13.8,-83.2,27.6,-83.6C41.4,-84,54.6,-76.2,44.7,-76.4Z" fill="url(#gradient1)" />
            </svg>
            
            <svg className="blob blob-2" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(200, 30, 93, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 107, 53, 0.08)" />
                </linearGradient>
              </defs>
              <path d="M37.8,-65.1C49.2,-58.3,58.7,-48.4,64.8,-36.2C70.9,-24,73.6,-9.5,72.8,4.6C72,18.7,67.7,32.4,59.8,43.8C51.9,55.2,40.4,64.3,27.2,70.1C14,75.9,-0.9,78.4,-16.2,75.6C-31.5,72.8,-47.2,64.7,-56.8,52.4C-66.4,40.1,-69.9,23.6,-69.7,7.4C-69.5,-8.8,-65.6,-24.7,-57.4,-37.4C-49.2,-50.1,-36.7,-59.6,-23.4,-65.8C-10.1,-72,-3.9,-75,7.2,-75.9C18.3,-76.8,26.4,-71.9,37.8,-65.1Z" fill="url(#gradient2)" />
            </svg>
            
            <svg className="blob blob-3" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(232, 84, 88, 0.06)" />
                  <stop offset="100%" stopColor="rgba(200, 30, 93, 0.06)" />
                </linearGradient>
              </defs>
              <path d="M39.4,-69.8C51.8,-62.7,62.8,-52.4,69.2,-39.8C75.6,-27.2,77.4,-12.3,75.8,1.9C74.2,16.1,69.2,29.6,61.1,41.2C53,52.8,41.8,62.5,28.9,68.7C16,74.9,1.4,77.6,-13.6,76.4C-28.6,75.2,-44,70.1,-55.8,61.2C-67.6,52.3,-75.8,39.6,-78.9,25.8C-82,12,-80,0.9,-75.1,-8.9C-70.2,-18.7,-62.4,-27.2,-52.8,-34.1C-43.2,-41,-31.8,-46.3,-20.2,-52.1C-8.6,-57.9,3.2,-64.2,16.8,-67.8C30.4,-71.4,45.8,-72.3,39.4,-69.8Z" fill="url(#gradient3)" />
            </svg>
          </div>
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainerVariants}>
          <AnimatedSection className="hero-container">
            <div className="container hero">
              <motion.div className="hero-content" variants={staggerContainerVariants}>
                <motion.div className="hero-badge" variants={heroTextVariants}>
                  <span>🌟 Empowering Youth Since 2013</span>
                </motion.div>
                <motion.div className="hero-tagline" variants={heroTextVariants}>
                  <span>Transform Lives</span>
                </motion.div>
                <motion.h1 className="hero-title" variants={heroTextVariants}>
                  Join the Hundred. Change Lives
                </motion.h1>
                <motion.h2 className="hero-subtitle" variants={heroTextVariants}>
                  Join an exclusive circle of changemakers funding confidence and self-worth for young people who need it most.
                </motion.h2>
                <motion.div className="countdown-container" variants={heroTextVariants}>
                  <h3>Campaign: Nov 2 - Dec 2, 2025</h3>
                  <p>Ends on Giving Tuesday</p>
                  <CountdownTimer />
                </motion.div>
              </motion.div>
              <motion.div className="hero-image-wrapper" variants={staggerContainerVariants}>
                <Image 
                  src="https://thebeayoutifulfoundation.com/wp-content/uploads/2020/10/InspiredByHer2020_POR_WEB-89.jpg"
                  width={500}
                  height={500}
                  className="hero-img" 
                  alt="Three women from the BeaYOUtiful Foundation laughing and empowered"
                  priority 
                />
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection id="tiers" className="container">
            <div className="membership-section">
              <motion.div className="membership-header" variants={staggerContainerVariants}>
                <h2 className="membership-title">One of the Hundred</h2>
                <p className="membership-subtitle">
                  We&apos;re building a community of 100 committed donors who believe every young person deserves confidence, self-worth, and a safe space to grow. Pledging $25 a month, you become part of One of the Hundred—a circle of change-makers who keep our programs running all year long.
                </p>
              </motion.div>
              <motion.div className="tiers-grid" variants={staggerContainerVariants}>
                <PricingTierCard
                  title="Changemaker"
                  subtitle="Maximum Impact"
                  price="$25"
                  pricePeriod="/ month"
                  impact="Funds 2 young people's workshops"
                  benefits={[
                    "Personalized welcome kit & digital badge",
                    "Featured on Impact Wall & quarterly spotlights",
                    "Early access to events & volunteer opportunities",
                    "Annual celebration invitation",
                    "Quarterly impact reports & member updates",
                    "Free digital event access",
                    "Founding changemaker recognition"
                  ]}
                  ctaText="Become a Changemaker"
                  isPopular={true}
                  highlightLabel="Top Impact"
                  donationUrl="https://www.zeffy.com/embed/donation-form/one-of-the-hundred?modal=true&amount=25"
                />
                <PricingTierCard
                  title="Supporter"
                  subtitle="Entry-Level Impact"
                  price="$5"
                  pricePeriod="/ month"
                  impact="Funds 1 young person's supplies"
                  benefits={["Bi-Annual newsletter", "Program achievements"]}
                  ctaText="Join"
                  donationUrl="https://www.zeffy.com/embed/donation-form/one-of-the-hundred?modal=true&amount=5"
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Modern Campaign Progress Section */}
          <AnimatedSection id="progress" className="container">
            <motion.div 
              className="campaign-progress-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <div className="progress-header">
                <h2>Campaign Progress</h2>
                <p>Join the movement and see our impact grow in real-time.</p>
              </div>
              
              <div className="progress-main-content">
                {/* Left Column */}
                <div className="progress-visual-column">
                  <div className="progress-circle-container">
                    <svg className="progress-ring" width="250" height="250" viewBox="0 0 250 250">
                      <circle className="progress-ring-bg" cx="125" cy="125" r="115" strokeWidth="12" />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c81e5d" />
                          <stop offset="100%" stopColor="#e95458" />
                        </linearGradient>
                      </defs>
                      <circle
                        className="progress-ring-fill"
                        cx="125"
                        cy="125"
                        r="115"
                        strokeWidth="12"
                        stroke="url(#progress-gradient)"
                        strokeDasharray={`${2 * Math.PI * 115}`}
                        strokeDashoffset={`${2 * Math.PI * 115 * (1 - 0)}`} // 0% progress
                      />
                    </svg>
                    <div className="progress-center">
                      <div className="progress-number">0<span className="progress-percent">%</span></div>
                      <div className="progress-label">Goal Achieved</div>
                    </div>
                  </div>
                  <div className="progress-summary-text">
                    <h3>0 of 100 Donors</h3>
                    <p>Thanks to our incredible community, we&apos;re well on our way to our goal. Every new member brings us closer to funding life-changing programs for youth.</p>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="progress-stats-column">
                  <div className="progress-stats">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-number"><RollingNumber value={0} /></div>
                        <div className="stat-label">Monthly Donors</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-number"><RollingNumber value={0} prefix="$" /></div>
                        <div className="stat-label">Monthly Revenue</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-number"><RollingNumber value={0} /></div>
                        <div className="stat-label">Youth Funded</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-number">100</div>
                        <div className="stat-label">Spots Remaining</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Zeffy Thermometer */}
              <div className="thermometer-wrapper">
                <div className="thermometer-container">
                  <div style={{position:'relative',overflow:'hidden',width:'100%',paddingTop:'120px'}}>
                    <iframe 
                      title='Donation form powered by Zeffy' 
                      style={{position: 'absolute', border: 0, top:0, left:0, bottom:0, right:0, width:'100%', height:'120px'}} 
                      src='https://www.zeffy.com/embed/thermometer/one-of-the-hundred'  
                      allow="payment"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection id="impact" className="container">
                     {/* Updated "Your Direct Impact" Section */}
            <motion.section 
              className="impact-direct-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <div className="impact-container">
                <motion.h2 
                  className="impact-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                >
                  Your Direct Impact
                </motion.h2>

                <div className="impact-grid">
                  {/* Left column - impact items */}
                  <motion.div 
                    className="impact-items-column"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
                  >
                    <div className="impact-card">
                      <div className="impact-icon">🎯</div>
                      <div className="impact-content">
                        <h3>Funds Confidence Workshops</h3>
                        <p>Your monthly gift provides supplies, materials, and resources for skill-building workshops.</p>
                      </div>
                    </div>

                    <div className="impact-card">
                      <div className="impact-icon">❤️</div>
                      <div className="impact-content">
                        <h3>Supports Mental Wellness</h3>
                        <p>You enable access to self-worth programming and mental health tools for vulnerable youth.</p>
                      </div>
                    </div>

                    <div className="impact-card">
                      <div className="impact-icon">✨</div>
                      <div className="impact-content">
                        <h3>Creates Lasting Change</h3>
                        <p>You build confidence, leadership, and community connection that lasts.</p>
                      </div>
                    </div>

                    <div className="impact-card">
                      <div className="impact-icon">🧭</div>
                      <div className="impact-content">
                        <h3>Guides Positive Choices</h3>
                        <p>Mentorship sessions help participants navigate school, friendships, and online life.</p>
                      </div>
                    </div>

                    <div className="impact-card">
                      <div className="impact-icon">📚</div>
                      <div className="impact-content">
                        <h3>Supplies Learning Tools</h3>
                        <p>Materials and journals support reflection and real habit change.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right column - funding details */}
                  <motion.div 
                    className="funding-details-column"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  >
                    <div className="funding-card">
                      {/* Image placeholder */}
                      <div className="funding-image-placeholder">
                        <div className="placeholder-content">
                          <span>Photo coming soon</span>
                        </div>
                      </div>

                      <h3>What Your Investment Funds</h3>
                      <p>
                        Your $25/month directly funds program materials, workshop supplies, mentorship resources, and mental wellness tools for young people who need them most. Based on current costs this supports about 2 participants each month. Your investment creates measurable, lasting impact.
                      </p>

                      <button 
                        className="fund-impact-btn"
                        onClick={() => {
                          // Open Zeffy modal with $25 pre-filled
                          const modal = document.createElement('div');
                          modal.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background-color: rgba(0,0,0,0.8);
                            z-index: 99999;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          `;
                          
                          const modalContent = document.createElement('div');
                          modalContent.style.cssText = `
                            position: relative;
                            width: 90%;
                            max-width: 800px;
                            height: 80%;
                            background-color: white;
                            border-radius: 8px;
                            overflow: hidden;
                          `;
                          
                          const closeBtn = document.createElement('button');
                          closeBtn.innerHTML = '×';
                          closeBtn.style.cssText = `
                            position: absolute;
                            top: 10px;
                            right: 15px;
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #333;
                            z-index: 1;
                          `;
                          
                          const iframe = document.createElement('iframe');
                          iframe.src = 'https://www.zeffy.com/embed/donation-form/one-of-the-hundred?modal=true&amount=25';
                          iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 8px;';
                          iframe.title = 'Donation Form';
                          
                          closeBtn.onclick = () => modal.remove();
                          modal.onclick = (e) => {
                            if (e.target === modal) modal.remove();
                          };
                          
                          modalContent.appendChild(closeBtn);
                          modalContent.appendChild(iframe);
                          modal.appendChild(modalContent);
                          document.body.appendChild(modal);
                        }}
                      >
                        Make Your Impact - Donate Now!
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* What Donors Receive Section */}
            <motion.section 
              id="benefits"
              className="donor-benefits-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            >
              <div className="benefits-header">
                <h2>What You Receive as a Member</h2>
                <p>Join &quot;One of the Hundred&quot; and enjoy these exclusive benefits</p>
              </div>
              
              <div className="benefits-grid">
                <motion.div 
                  className="benefit-category"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                >
                  <div className="benefit-icon">🏆</div>
                  <h3>1. Exclusive Recognition</h3>
                  <ul>
                    <li><strong>Personalized Welcome Kit</strong> - Digital welcome newsletter with video from our team and participants</li>
                    <li><strong>Digital Badge</strong> - Branded &quot;One of the Hundred&quot; badge to share on social media</li>
                    <li><strong>Name Recognition</strong> - Listed on dedicated webpage and featured on annual &quot;Wall of Impact&quot;</li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="benefit-category"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                >
                  <div className="benefit-icon">✨</div>
                  <h3>2. Inside Access & Updates</h3>
                  <ul>
                    <li><strong>Quarterly Impact Reports</strong> - Stories, photos, and updates on how your gifts change lives</li>
                    <li><strong>Member-Only Updates</strong> - Behind-the-scenes videos from workshops and programs</li>
                    <li><strong>Early Event Access</strong> - Pre-sale registration for galas, events, and volunteer opportunities</li>
                    <li><strong>Free Digital Event</strong> - Access to wellness or leadership development events</li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="benefit-category"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
                >
                  <div className="benefit-icon">🎉</div>
                  <h3>3. Special Appreciation Moments</h3>
                  <ul>
                    <li><strong>Annual Celebration Call</strong> - A virtual thank-you with mentors, participants, and staff</li>
                    <li><strong>Networking Events</strong> - Potential free networking event in Vancouver or free ticket to community gathering events</li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Updated Stats Section */}
            <motion.section 
              className="stats"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <RollingNumber 
                  value={30000} 
                  prefix="$" 
                  className="stat-number"
                  duration={2000}
                  delay={300}
                />
                <div className="stat-label">CAMPAIGN GOAL</div>
              </motion.div>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <RollingNumber 
                  value={0} // This will be the live counter
                  suffix="/100"
                  className="stat-number"
                  duration={2000}
                  delay={600}
                />
                <div className="stat-label">DONORS</div>
              </motion.div>
            </motion.section>

            {/* ... (Testimonials and other sections remain) ... */}

            <motion.section 
              className="testimonials-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="testimonials-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 className="testimonials-title">VOICES OF IMPACT</h2>
                <p className="testimonials-subtitle">
                  Hear from the young people and supporters whose lives have been transformed.
                </p>
              </motion.div>
              <motion.div 
                className="testimonials-grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&ldquo;The confidence workshops helped me find my voice. I never thought I could speak in front of my class, but now I&apos;m mentoring others.&rdquo;</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">AJ</div>
                    <div className="author-info">
                      <h4>Alex Johnson</h4>
                      <span>Workshop Participant, Age 16</span>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&ldquo;Giving $15 a month is the easiest high-impact habit I have. Seeing the monthly updates makes me feel connected to the change.&rdquo;</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">SM</div>
                    <div className="author-info">
                      <h4>Sarah Martinez</h4>
                      <span>Monthly Supporter</span>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&ldquo;The mentorship program gave me the tools to believe in myself. Now I&apos;m applying to college with confidence I never had before.&rdquo;</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">TK</div>
                    <div className="author-info">
                      <h4>Taylor Kim</h4>
                      <span>Mentorship Graduate, Age 17</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          </AnimatedSection>
          </motion.div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo">BF</div>
                <h3>BeaYOUtiful Foundation</h3>
              </div>
              <p>Empowering young people to recognize their inherent value and build confidence through community, connection, and acts of kindness.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#tiers">Donate</a></li>
                <li><a href="#tiers">Membership Tiers</a></li>
                <li><a href="#impact">Our Impact</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Programs</h4>
              <ul>
                <li>Confidence Workshops</li>
                <li>Mentorship Programs</li>
                <li>Leadership Training</li>
                <li>Community Events</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="mailto:programs@thebeayoutifulfoundation.com">programs@thebeayoutifulfoundation.com</a></li>
                <li>Charitable Registration # 75317 9712 RR0001</li>
                <li><a href="https://thebeayoutifulfoundation.com/" target="_blank" rel="noopener noreferrer">Main Website</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 BeaYOUtiful Foundation. All rights reserved.</p>
              <div className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/accessibility">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
