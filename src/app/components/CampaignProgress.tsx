"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CampaignData {
  donorsCurrent: number;
  donorsTarget: number;
  monthlyRevenue: number;
  monthlyGoal: number;
  kidsFunded: number;
}

interface CampaignProgressProps {
  className?: string;
}

export default function CampaignProgress({ className = "" }: CampaignProgressProps) {
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousData, setPreviousData] = useState<CampaignData | null>(null);

  // Mock data for now - replace with actual API call
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockData: CampaignData = {
        donorsCurrent: 0,
        donorsTarget: 100,
        monthlyRevenue: 0,
        monthlyGoal: 30000,
        kidsFunded: 0
      };
      
      setPreviousData(data);
      setData(mockData);
    } catch (err) {
      setError('Unable to load live data. Showing zeros.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const donorsProgress = data ? (data.donorsCurrent / data.donorsTarget) : 0;
  const revenueProgress = data ? (data.monthlyRevenue / data.monthlyGoal) : 0;
  const spotsLeft = data ? (data.donorsTarget - data.donorsCurrent) : 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { 
    value: number; 
    prefix?: string; 
    suffix?: string; 
  }) => (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );

  const SkeletonRing = () => (
    <div className="donors-ring skeleton">
      <div className="skeleton-ring"></div>
      <div className="ring-center">
        <div className="skeleton-number"></div>
        <div className="skeleton-label"></div>
        <div className="skeleton-subtitle"></div>
      </div>
    </div>
  );

  const SkeletonBar = () => (
    <div className="revenue-bar skeleton">
      <div className="skeleton-bar-track"></div>
      <div className="skeleton-bar-labels">
        <div className="skeleton-label"></div>
        <div className="skeleton-label"></div>
        <div className="skeleton-label"></div>
      </div>
    </div>
  );

  return (
    <section className={`campaign-progress-section ${className}`}>
      <div className="progress-header">
        <h2>Campaign progress</h2>
        <p>Live numbers. Updating automatically.</p>
      </div>
      
      <div className="progress-content">
        {/* Primary KPI: Donors Ring */}
        <div className="donors-ring-container">
          {loading ? (
            <SkeletonRing />
          ) : (
            <div className="donors-ring">
              <svg className="progress-ring" width="160" height="160" aria-label={`${data?.donorsCurrent || 0} of ${data?.donorsTarget || 100} donors`}>
                <circle
                  className="progress-ring-track"
                  stroke="#f3f4f6"
                  strokeWidth="6"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
                <motion.circle
                  className="progress-ring-fill"
                  stroke="url(#ringGradient)"
                  strokeWidth="6"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - donorsProgress)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  initial={{ strokeDashoffset: `${2 * Math.PI * 70}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 70 * (1 - donorsProgress)}` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c81e5d" />
                    <stop offset="100%" stopColor="#e95458" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="ring-center">
                <div className="ring-number">
                  <AnimatedNumber 
                    value={data?.donorsCurrent || 0} 
                  />
                </div>
                <div className="ring-label">of {data?.donorsTarget || 100}</div>
                <div className="ring-subtitle">donors</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Secondary KPIs */}
        <div className="secondary-kpis">
          <div className="kpi-stat">
            <div className="kpi-icon">🌟</div>
            <div className="kpi-content">
              <div className="kpi-number">
                {loading ? (
                  <div className="skeleton-kpi-number"></div>
                ) : (
                  <AnimatedNumber 
                    value={data?.kidsFunded || 0} 
                  />
                )}
              </div>
              <div className="kpi-label">Kids funded this month</div>
            </div>
          </div>
          
          <div className="kpi-stat">
            <div className="kpi-icon">💰</div>
            <div className="kpi-content">
              <div className="kpi-number">
                {loading ? (
                  <div className="skeleton-kpi-number"></div>
                ) : (
                  formatCurrency(data?.monthlyRevenue || 0)
                )}
              </div>
              <div className="kpi-label">Monthly revenue</div>
            </div>
          </div>
          
          <div className="kpi-stat tertiary">
            <div className="kpi-icon">🎯</div>
            <div className="kpi-content">
              <div className="kpi-number">
                {loading ? (
                  <div className="skeleton-kpi-number"></div>
                ) : (
                  <AnimatedNumber 
                    value={spotsLeft} 
                  />
                )}
              </div>
              <div className="kpi-label">Spots left</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Progress Bar */}
      <div className="revenue-bar-container">
        {loading ? (
          <SkeletonBar />
        ) : (
          <div className="revenue-bar">
            <div className="bar-track">
              <motion.div 
                className="bar-fill" 
                initial={{ width: '0%' }}
                animate={{ width: `${revenueProgress * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
            <div className="bar-labels">
              <span className="bar-start">{formatCurrency(data?.monthlyRevenue || 0)}</span>
              <span className="bar-percent">{Math.round(revenueProgress * 100)}%</span>
              <span className="bar-end">{formatCurrency(data?.monthlyGoal || 30000)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p>{error}</p>
            <button 
              onClick={fetchData}
              className="retry-button"
              type="button"
            >
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zeffy Thermometer */}
      <div className="thermometer-container">
        <div style={{position:'relative',overflow:'hidden',width:'100%',paddingTop:'120px'}}>
          <iframe 
            title='Donation form powered by Zeffy' 
            style={{position: 'absolute', border: 0, top:0, left:0, bottom:0, right:0, width:'100%', height:'120px'}} 
            src='https://www.zeffy.com/embed/thermometer/one-of-the-hundred'  
            allowTransparency={true}
          />
        </div>
      </div>
    </section>
  );
}
