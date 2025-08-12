'use client';

import { useState } from 'react';
import RollingNumber from './RollingNumber';
import DOMPurify from 'dompurify';

const donationTiers = [
  { amount: 10, description: "Funds 1 workshop" },
  { amount: 25, description: "Funds 3 workshops" },
  { amount: 50, description: "Funds 6 workshops" }
];

export default function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [donationType, setDonationType] = useState<'monthly' | 'one-time'>('monthly');
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = () => {
    const sanitizedAmount = DOMPurify.sanitize(customAmount);
    const amount = sanitizedAmount ? parseFloat(sanitizedAmount) : selectedAmount;
    // Here you would integrate with Stripe or your payment processor
    console.log(`Processing ${donationType} donation of $${amount}`);
    alert(`Thank you for your ${donationType} donation of $${amount}! This would integrate with your payment processor.`);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <h2 className="text-3xl font-bold text-center mb-8">Make Your Impact</h2>
          
          {/* Progress Ring */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#8b5cf6" strokeWidth="8" 
                  strokeDasharray="339.292" strokeDashoffset="203.575" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <RollingNumber 
                    value={18750} 
                    prefix="$" 
                    className="text-2xl font-bold text-purple-600"
                    duration={2000}
                    delay={500}
                  />
                  <div className="text-sm text-gray-600">raised</div>
                </div>
              </div>
            </div>
            <div className="text-gray-600">Goal: $50,000</div>
          </div>

          {/* Donation Tiers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {donationTiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  selectedAmount === tier.amount 
                    ? 'border-purple-600 bg-purple-50' 
                    : 'border-purple-200 hover:border-purple-600'
                }`}
              >
                <div className="text-xl font-bold text-purple-600">${tier.amount}</div>
                <div className="text-sm text-gray-600">{tier.description}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="donation-type" 
                checked={donationType === 'one-time'}
                onChange={() => setDonationType('one-time')}
                className="text-purple-600"
              />
              <span>One-time</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="donation-type" 
                checked={donationType === 'monthly'}
                onChange={() => setDonationType('monthly')}
                className="text-purple-600"
              />
              <span>Monthly</span>
            </label>
          </div>

          <button 
            onClick={handleDonate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Donate ${customAmount || selectedAmount} {donationType === 'monthly' ? '/month' : ''}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Your donation is secure and tax-deductible. We&apos;ll send you a receipt immediately.
          </p>
        </div>
      </div>
    </section>
  );
} 