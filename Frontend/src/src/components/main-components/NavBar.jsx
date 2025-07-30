import "../../../app/(home)/MyScheme.css";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { DropdownMenuRadioGroupDemo } from "./DropdownLngTrigger";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <section className="title-bar">
      <div className="title-container">
        <nav className="w-full">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className="flex rounded outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
                aria-label="Home"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-purple-600 font-bold text-xl">C</span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <SignedOut>
                  <SignInButton>
                    <button className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                      Sign up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
              </div>
              
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                <ModeToggle />
                <DropdownMenuRadioGroupDemo />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                aria-expanded="false"
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-4 pt-2 pb-6 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {/* Authentication buttons for mobile */}
              <div className="flex flex-col space-y-3">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                      Sign up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton showName />
                  </div>
                </SignedIn>
              </div>
              
              {/* Settings for mobile */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <ModeToggle />
                <DropdownMenuRadioGroupDemo />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;