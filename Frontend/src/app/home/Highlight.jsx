// Highlight.jsx
import React from 'react';
import './Highlight.css';
import { GraduationCap, Users } from 'lucide-react';

function Highlight() {
  return (
    <section className="highlight-section">
      <div className="highlight-wrapper">
        <div className="highlight-card">
          <div className="highlight-inner">
            <GraduationCap className="highlight-icon" />
            <div className="highlight-content">
              <h3>1000+</h3>
              <p> Total Schemes</p>
            </div>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-inner">
            <Users className="highlight-icon" />
            <div className="highlight-content">
              <h3>50+</h3>
              <p>State Schemes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlight;
