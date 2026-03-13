import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="landing-page">
      {/* Dashboard Illustration Placeholder */}
      <div className="landing-illustration">
        <svg width="400" height="350" viewBox="0 0 400 350" fill="none">
          {/* Finance Dashboard Card */}
          <rect x="20" y="20" width="360" height="310" rx="20" fill="white" opacity="0.1" />
          <rect x="40" y="40" width="320" height="270" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          
          {/* Header */}
          <rect x="50" y="50" width="300" height="40" rx="8" fill="rgba(102, 126, 234, 0.2)" />
          <circle cx="70" cy="70" r="8" fill="rgba(102, 126, 234, 0.8)" />
          <circle cx="90" cy="70" r="8" fill="rgba(118, 75, 162, 0.6)" />
          
          {/* Charts */}
          <line x1="50" y1="120" x2="350" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Chart 1 - Bars */}
          <rect x="60" y="160" width="15" height="80" rx="3" fill="rgba(102, 126, 234, 0.6)" />
          <rect x="85" y="140" width="15" height="100" rx="3" fill="rgba(102, 126, 234, 0.8)" />
          <rect x="110" y="150" width="15" height="90" rx="3" fill="rgba(118, 75, 162, 0.7)" />
          <rect x="135" y="120" width="15" height="120" rx="3" fill="rgba(102, 126, 234, 0.7)" />
          
          {/* Chart 2 - Line */}
          <path d="M 180 180 Q 200 140 220 160 T 260 150" stroke="rgba(118, 75, 162, 0.8)" strokeWidth="2" fill="none" />
          <circle cx="180" cy="180" r="3" fill="rgba(118, 75, 162, 0.8)" />
          <circle cx="220" cy="160" r="3" fill="rgba(118, 75, 162, 0.8)" />
          <circle cx="260" cy="150" r="3" fill="rgba(118, 75, 162, 0.8)" />
          
          {/* Stats */}
          <rect x="50" y="270" width="75" height="35" rx="6" fill="rgba(102, 126, 234, 0.1)" />
          <text x="88" y="293" fontSize="12" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontWeight="600">$12.5K</text>
          
          <rect x="140" y="270" width="75" height="35" rx="6" fill="rgba(102, 126, 234, 0.1)" />
          <text x="178" y="293" fontSize="12" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontWeight="600">+24%</text>
          
          <rect x="230" y="270" width="75" height="35" rx="6" fill="rgba(102, 126, 234, 0.1)" />
          <text x="268" y="293" fontSize="12" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontWeight="600">Active</text>
        </svg>
      </div>

      {/* Main Content Card */}
      <div className="landing-content">
        <h1>Take Control of Your Money with Mercurio</h1>
        <p>
          Track expenses, set smart budgets, and achieve financial freedom with
          powerful financial insights.
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <Link to="/auth">
            <Button type="primary" size="large">
              Get Started
            </Button>
          </Link>
          <Link to="/auth">
            <Button type="default" size="large">
              Log In
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="features">
          <div className="feature-item">
            <span className="icon">💰</span>
            <span>Track Expenses</span>
          </div>
          <div className="feature-item">
            <span className="icon">📊</span>
            <span>Smart Budgets</span>
          </div>
          <div className="feature-item">
            <span className="icon">🎯</span>
            <span>Reach Financial Goals</span>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="trust-indicator">
          🔒 Secure • Private • Free to Start
        </div>
      </div>
    </div>
  );
};

export default Home;