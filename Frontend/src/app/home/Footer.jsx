"use client"
import React, { useState, useEffect } from 'react';
import './Footer.css';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Bell
} from 'lucide-react';

function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-grid">

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/schemes">All Schemes</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal & Policy</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: xxxxxxxxxxxxxxxx.gov</p>
          <p>Phone: +91 xxxxx xxxxx</p>
          <p>Address: xxxxx xxxxxx, xxxx xxxx, India</p>
          <p>Hours: Mon–Fri, 9am–6pm</p>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Stay informed with the latest government schemes</p>
          <form>
            <input type="email" placeholder="Your Email" />
            <button type="submit">
              <Bell size={16} style={{ marginRight: '6px' }} />Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-grid footer-second-row">
        <div className="footer-section center-align">
          <h3>Followers</h3>
          <div className="social-icons">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
            <a href="#"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="footer-section center-align">
          <h3>Useful Resources</h3>
          <ul>
            <li><a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer">MyGov.in</a></li>
            <li><a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer">National Scholarship Portal</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Yojana Connect . All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
