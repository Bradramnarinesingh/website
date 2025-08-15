'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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

// Sparkle animation component
const SparkleContainer = ({ isPopular }: { isPopular: boolean }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; shape: string; delay: number }>>([]);
  const lastTriggerTime = useRef(0);
  const animationRef = useRef<number | null>(null);

  const createSparkles = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggerTime.current < 1500) return; // Debounce 1.5s
    
    lastTriggerTime.current = now;
    setIsAnimating(true);
    
    // Generate sparkles that cover the entire card area
    const sparkleCount = Math.floor(Math.random() * 6) + 20; // 20-25 sparkles
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 120, // -60 to 60px from center - covers full card width
      y: (Math.random() - 0.5) * 160, // -80 to 80px from center - covers full card height
      size: Math.random() * 8 + 6, // 6-14px - good visibility
      shape: ['dot', 'star4', 'star6'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 150 // 0-150ms stagger
    }));
    
    setSparkles(newSparkles);
    
    // Reset after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setSparkles([]);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleSparkleTrigger = (event: CustomEvent) => {
      if (event.detail.isPopular && !isAnimating) {
        createSparkles();
      }
    };

    document.addEventListener('sparkle-trigger', handleSparkleTrigger as EventListener);
    
    return () => {
      document.removeEventListener('sparkle-trigger', handleSparkleTrigger as EventListener);
    };
  }, [isPopular, isAnimating, createSparkles]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isPopular) return null;

  return (
    <div 
      className="sparkle-container"
      style={{ pointerEvents: 'none' }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`sparkle sparkle-${sparkle.shape}`}
          style={{
            '--sparkle-x': `${sparkle.x}px`,
            '--sparkle-y': `${sparkle.y}px`,
            '--sparkle-size': `${sparkle.size}px`,
            '--sparkle-delay': `${sparkle.delay}ms`,
          } as React.CSSProperties}
        />
      ))}
      <div className={`sparkle-glow ${isAnimating ? 'active' : ''}`} />
    </div>
  );
};

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
  
  // Sparkle animation handlers
  const handleMouseEnter = useCallback(() => {
    if (isPopular) {
      // Trigger sparkle animation
      const event = new CustomEvent('sparkle-trigger', { detail: { isPopular } });
      document.dispatchEvent(event);
    }
  }, [isPopular]);

  const handleFocus = useCallback(() => {
    if (isPopular) {
      // Trigger sparkle animation
      const event = new CustomEvent('sparkle-trigger', { detail: { isPopular } });
      document.dispatchEvent(event);
    }
  }, [isPopular]);

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
    <div 
      className={`tier-card ${isPopular ? 'popular' : ''}`}
      onMouseEnter={isPopular ? handleMouseEnter : undefined}
      onFocus={isPopular ? handleFocus : undefined}
    >
      <SparkleContainer isPopular={isPopular} />
      
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
            aria-expanded={isExpanded}
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
