'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Eye, QrCode } from 'lucide-react';

const AnimatedDots = () => {
  const [dots, setDots] = useState([]);
  const features = [
    {
      title: "End-to-End Transparency",
      description: "Blockchain ensures all participants in the supply chain have access to verified information about a product's journey.",
      icon: <Eye />,
      color: "#8A2BE2" // BlueViolet
    },
    {
      title: "Real-Time Tracking",
      description: "Track products in real-time as they move through the supply chain network.",
      icon: <Clock />,
      color: "#4682B4" // SteelBlue
    },
    {
      title: "Immutable Record",
      description: "Smart contracts ensure that no one can alter product data, providing an auditable and trustworthy supply chain.",
      icon: <Shield />,
      color: "#20B2AA" // LightSeaGreen
    },
    {
      title: "Consumer Verification",
      description: "Consumers can scan QR codes to verify product information directly from the blockchain.",
      icon: <QrCode />,
      color: "#9370DB" // MediumPurple
    }
  ];
  
  useEffect(() => {
    const newDots = [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      backgroundColor: features[i % features.length].color,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.width,
            height: dot.height,
            backgroundColor: dot.backgroundColor,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};


const AnimatedFeaturesSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // We'll import gsap in this useEffect to ensure it's only loaded on the client side
    const importGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;
      
      gsap.registerPlugin(ScrollTrigger);
      
      if (sectionRef.current) {
        // Background animation for gradient movement
        gsap.to(sectionRef.current, {
          backgroundPosition: '100% 100%',
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
        
        // ScrollTrigger animation for cards staggered reveal
        gsap.from('.feature-card', {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none"
          }
        });
      }
    };
    
    importGSAP();
  }, []);
  
  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(138, 43, 226, 0.2)",
      transition: { duration: 0.3 }
    }
  };
  
  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, scale: 1.2, transition: { yoyo: Infinity, duration: 1.5 } }
  };
  
  const features = [
    {
      title: "Expense Transparency",
      description: "Track every expense and income with complete visibility to ensure you're always aware of your financial situation.",
      icon: <Eye />,
      color: "#8A2BE2" // BlueViolet
    },
    {
      title: "Real-Time Budget Monitoring",
      description: "Monitor your budget in real-time and get alerts when you're nearing your spending limit.",
      icon: <Clock />,
      color: "#4682B4" // SteelBlue
    },
    {
      title: "Secure Financial Records",
      description: "All your financial data is securely stored and cannot be tampered with, ensuring accuracy and reliability.",
      icon: <Shield />,
      color: "#20B2AA" // LightSeaGreen
    },
    {
      title: "Instant Expense Verification",
      description: "Instantly verify your expenses and transactions with just a scan of a receipt or payment confirmation.",
      icon: <QrCode />,
      color: "#9370DB" // MediumPurple
    }
  ];  
  
  return (
    <section 
      ref={sectionRef} 
      className="w-full py-20 px-4 relative overflow-hidden"
      style={{ 
        backgroundColor: "#121212", 
        backgroundImage: "radial-gradient(circle at 10% 10%, #1E1E30 0%, #121212 70%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%"
      }}
    >
      {/* Animated background dots */}
      <AnimatedDots/>
    
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header with animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Key Features of our Real-Time Personal Finance Tracker
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>
        
        {/* Feature Cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card bg-gray-900 rounded-xl p-6 border border-gray-800"
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="flex items-start">
                <motion.div 
                  className="mr-4 p-3 rounded-lg"
                  style={{ backgroundColor: `${feature.color}20` }}
                  variants={iconVariants}
                >
                  <div style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Animated gradient line under each card */}
              <motion.div 
                className="h-1 mt-4 rounded-full"
                style={{ background: `linear-gradient(90deg, ${feature.color} 0%, transparent 100%)` }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Call to action with hover effect */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-medium"
            whileHover={{ 
              scale: 1.05,
              backgroundPosition: "right center",
              boxShadow: "0px 0px 20px rgba(123, 104, 238, 0.6)"
            }}
            transition={{ duration: 0.3 }}
          >
            Explore Our Solution
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedFeaturesSection;