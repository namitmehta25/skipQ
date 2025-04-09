'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      initial={{ y: 0 }}
      animate={{ 
        y: isScrolled ? 10 : 0,
        boxShadow: isScrolled ? '0 10px 25px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div 
        className={`${
          isScrolled 
            ? 'bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg mx-4 lg:mx-8 my-1' 
            : 'bg-white'
        } py-4`}
        whileHover={isScrolled ? { y: -3 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Logo className={`w-10 h-10 mr-2 ${isScrolled ? 'text-white' : 'text-indigo-600'}`} />
                <span className={`font-bold text-xl ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/Outlets" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Outlets
              </Link>
              <Link 
                href="/Cart" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Cart
              </Link>
              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Contact
              </Link>

              {/* Authentication */}
              <div className="ml-4 flex items-center">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <motion.button 
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          isScrolled 
                            ? 'text-white hover:text-indigo-100' 
                            : 'text-indigo-600 hover:text-indigo-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Login
                      </motion.button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <motion.button 
                        className={`ml-4 px-4 py-2 rounded-md text-sm font-medium ${
                          isScrolled 
                            ? 'bg-white text-black hover:bg-gray-100' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sign Up
                      </motion.button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-indigo-600'
                }`}
                aria-expanded="false"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu, toggle based on menu state */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}>
                <Link 
                  href="/" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/Outlets" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Outlets
                </Link>
                {/* <Link 
                  href="/how-it-works" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How it Works
                </Link> */}
                <Link 
                  href="/Cart" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link 
                  href="/contact" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {/* Authentication for mobile */}
                {!isSignedIn ? (
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <SignInButton mode="modal">
                          <motion.button 
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                              isScrolled 
                                ? 'border border-white text-white' 
                                : 'border border-indigo-600 text-indigo-600'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Login
                          </motion.button>
                        </SignInButton>
                      </div>
                      <div className="ml-3">
                        <SignUpButton mode="modal">
                          <motion.button 
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                              isScrolled 
                                ? 'bg-white text-indigo-600' 
                                : 'bg-indigo-600 text-white'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Sign Up
                          </motion.button>
                        </SignUpButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                      <div className="ml-3">
                        <div className={`text-base font-medium ${isScrolled ? 'text-white' : 'text-gray-800'}`}>
                          {user?.fullName || user?.username}
                        </div>
                        <div className={`text-sm font-medium ${isScrolled ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user?.primaryEmailAddress?.emailAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;