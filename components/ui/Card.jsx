import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const RestaurantCard = ({ restaurant }) => {
  const { 
    id,
    name, 
    image, 
    cuisine, 
    rating, 
    reviewCount, 
    priceRange, 
    distance, 
    dineinAvailable, 
    takeoutAvailable, 
    openingHours,
    hasMenu
  } = restaurant;

  // Convert price range number to $ symbols
  const getPriceSymbols = (priceLevel) => {
    return '$'.repeat(priceLevel);
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-gray-900 hover:bg-gray-800 transition-colors duration-300 w-full max-w-sm border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        
        {(dineinAvailable || takeoutAvailable) && (
          <motion.div 
            className="absolute bottom-0 left-0 bg-gray-900/90 backdrop-blur-sm px-3 py-2 m-3 rounded-lg flex space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {dineinAvailable && (
              <span className="text-xs font-medium text-emerald-400">Dine-in</span>
            )}
            {dineinAvailable && takeoutAvailable && (
              <span className="text-gray-500">|</span>
            )}
            {takeoutAvailable && (
              <span className="text-xs font-medium text-sky-400">Takeout</span>
            )}
          </motion.div>
        )}
      </motion.div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <motion.h3 
            className="text-lg font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {name}
          </motion.h3>
          <motion.span 
            className="bg-gray-800 text-emerald-400 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating} ({reviewCount})
          </motion.span>
        </div>
        
        <motion.div 
          className="mt-2 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm text-gray-300">{cuisine}</span>
          <span className="mx-2 text-gray-600">•</span>
          <span className="text-sm text-gray-300">{getPriceSymbols(priceRange)}</span>
          <span className="mx-2 text-gray-600">•</span>
          <span className="text-sm text-gray-300">{distance} km</span>
        </motion.div>
        
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-300">Hours: </span>{openingHours}
          </p>
        </motion.div>
        
        <Link href={hasMenu ? `/menu/${id}` : '#'}>
          <motion.button 
            className={`mt-5 w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group
              ${hasMenu 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                : 'bg-gray-700 cursor-not-allowed text-gray-300'}`}
            whileHover={hasMenu ? { scale: 1.02 } : {}}
            whileTap={hasMenu ? { scale: 0.98 } : {}}
          >
            {hasMenu ? (
              <>
                View Menu
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: 3 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1 
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </>
            ) : (
              'Menu Coming Soon'
            )}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;