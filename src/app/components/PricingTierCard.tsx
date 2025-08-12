'use client';

import { useState, useRef, useEffect } from 'react';

interface PricingTierCardProps {
  title: string;
  subtitle: string;
  price: string;
  pricePeriod: string;
  impact: string;
  benefits: string[];
  ctaText: string;
  isPopular?: boolean;
  highlightLabel?: string;
  defaultVisibleCount?: number;
  donationUrl?: string;
}

export default function PricingTierCard({
  title,
  subtitle,
  price,
  pricePeriod,
  impact,
  benefits,
  ctaText,
  isPopular = false,
  highlightLabel,
  defaultVisibleCount = 4,
  donationUrl = "https://www.zeffy.com/embed/donation-form/one-of-the-hundred?modal=true"
}: PricingTierCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const visibleBenefits = benefits.slice(0, defaultVisibleCount);
  const hiddenBenefits = benefits.slice(defaultVisibleCount);
  const hasHiddenBenefits = hiddenBenefits.length > 0;

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [benefits]);

  const toggleExpanded = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <>
    <div className={`tier-card ${isPopular ? 'popular' : ''}`}>
      {highlightLabel && (
        <div className="popular-badge">{highlightLabel}</div>
      )}
      
      <div className="tier-header">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      
      <div className="tier-price">
        {price} <span className="price-period">{pricePeriod}</span>
      </div>
      
      <div className="tier-impact">{impact}</div>
      
      <div className="tier-features">
        {visibleBenefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
        
        {hasHiddenBenefits && (
          <div 
            ref={contentRef}
            className={`hidden-benefits ${isExpanded ? 'expanded' : ''}`}
            style={{
              maxHeight: isExpanded ? `${contentHeight}px` : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out'
            }}
          >
            {hiddenBenefits.map((benefit, index) => (
              <li key={index + defaultVisibleCount}>{benefit}</li>
            ))}
          </div>
        )}
      </div>
      
      {hasHiddenBenefits && (
        <div className="benefits-toggle-container">
          <button
            className="benefits-toggle-btn"
            onClick={toggleExpanded}
            onKeyDown={handleKeyDown}
            aria-expanded={isExpanded ? 'true' : 'false'}
            role="button"
            tabIndex={0}
          >
            {isExpanded ? 'View fewer benefits' : 'View more benefits'}
          </button>
        </div>
      )}
      
                                                                                                                                           <button 
                     className="tier-join-btn"
                     onClick={() => setShowModal(true)}
                   >
                     {ctaText}
                   </button>
     </div>
     
     {showModal && (
       <>
         <div 
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             width: '100vw',
             height: '100vh',
             backgroundColor: 'rgba(0,0,0,0.8)',
             zIndex: 99999,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}
           onClick={() => setShowModal(false)}
         >
           <div 
             style={{
               position: 'relative',
               width: '90%',
               maxWidth: '800px',
               height: '80%',
               backgroundColor: 'white',
               borderRadius: '8px'
             }}
             onClick={(e) => e.stopPropagation()}
           >
             <button 
               onClick={() => setShowModal(false)}
               style={{
                 position: 'absolute',
                 top: '-15px',
                 right: '-15px',
                 background: '#c81e5d',
                 color: 'white',
                 border: 'none',
                 borderRadius: '50%',
                 width: '30px',
                 height: '30px',
                 cursor: 'pointer',
                 zIndex: 100000,
                 fontSize: '18px',
                 fontWeight: 'bold'
               }}
             >
               ×
             </button>
             <iframe
               src={donationUrl}
               style={{
                 width: '100%',
                 height: '100%',
                 border: 'none',
                 borderRadius: '8px'
               }}
               title="Donation Form"
             />
           </div>
         </div>
       </>
     )}
   </>
   );
 }
