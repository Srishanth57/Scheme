// src/Footer.jsx
"use client";
import React, { useState, useEffect } from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Bell,
} from "lucide-react";

function Footer() {
  return (
    
    <footer
      className={`bg-[#0d1b2a] text-white py-10 px-5 font-[Arial,sans-serif] `}
    >
      {/* Equivalent to .footer-grid */}
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-[30px]">
        {" "}
        {/* Adjusted gap-y for consistency */}
        {/* Equivalent to .footer-section */}
        <div className="flex-1 min-w-[200px]">
          {/* Equivalent to .footer-section h3 */}
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Quick Links
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="my-2">
              <a
                href="/"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Home
              </a>
            </li>
            <li className="my-2">
              <a
                href="/about"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                About Us
              </a>
            </li>
            <li className="my-2">
              <a
                href="/schemes"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                All Schemes
              </a>
            </li>
            <li className="my-2">
              <a
                href="/categories"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Categories
              </a>
            </li>
            <li className="my-2">
              <a
                href="/faq"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                FAQs
              </a>
            </li>
            <li className="my-2">
              <a
                href="/contact"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Legal & Policy
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="my-2">
              <a
                href="/privacy"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Privacy Policy
              </a>
            </li>
            <li className="my-2">
              <a
                href="/terms"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Terms & Conditions
              </a>
            </li>
            <li className="my-2">
              <a
                href="/accessibility"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Accessibility
              </a>
            </li>
            <li className="my-2">
              <a
                href="/disclaimer"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                Disclaimer
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Contact Info
          </h3>
          <p className="my-[6px]">Email: xxxxxxxxxxxxxxxx.gov</p>
          <p className="my-[6px]">Phone: +91 xxxxx xxxxx</p>
          <p className="my-[6px]">Address: xxxxx xxxxxx, xxxx xxxx, India</p>
          <p className="my-[6px]">Hours: Mon–Fri, 9am–6pm</p>
        </div>
        {/* Equivalent to .footer-section .newsletter */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Newsletter
          </h3>
          <p>Stay informed with the latest government schemes</p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 mb-[10px] border-none rounded"
            />
            <button
              type="submit"
              className="bg-[#ffb703] text-black border-none py-2 px-4 rounded cursor-pointer flex items-center justify-center font-bold hover:bg-[#f77f00]"
            >
              <Bell size={16} style={{ marginRight: "6px" }} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Equivalent to .footer-grid .footer-second-row */}
      <div className="flex flex-wrap justify-center mt-5 gap-x-8 gap-y-[30px] max-w-[600px] mx-auto">
        {" "}
        {/* Adjusted gap-y */}
        {/* Equivalent to .footer-section .center-align */}
        <div className="flex-1 min-w-[200px] flex flex-col items-center text-center">
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Followers
          </h3>
          <div className="flex">
            {" "}
            {/* Equivalent to .social-icons */}
            <a
              href="#"
              className="mr-[10px] text-white transition-transform duration-300 hover:scale-110 hover:text-[#ffb703]"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="mr-[10px] text-white transition-transform duration-300 hover:scale-110 hover:text-[#ffb703]"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="mr-[10px] text-white transition-transform duration-300 hover:scale-110 hover:text-[#ffb703]"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="mr-[10px] text-white transition-transform duration-300 hover:scale-110 hover:text-[#ffb703]"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="mr-[10px] text-white transition-transform duration-300 hover:scale-110 hover:text-[#ffb703]"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
        <div className="flex-1 min-w-[200px] flex flex-col items-center text-center">
          <h3 className="border-b-2 border-[#1e6091] pb-[5px] mb-[10px] text-lg text-[#ffb703]">
            Useful Resources
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="my-2">
              <a
                href="https://www.mygov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                MyGov.in
              </a>
            </li>
            <li className="my-2">
              <a
                href="https://scholarships.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline transition-colors duration-300 hover:text-[#adb5bd]"
              >
                National Scholarship Portal
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Equivalent to .footer-bottom */}
      <div className="text-center pt-5 mt-10 border-t border-[#1e6091] text-sm text-[#ccc]">
        <p>© 2025 Yojana Connect . All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
