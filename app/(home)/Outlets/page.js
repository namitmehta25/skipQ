'use client'
import React, { useState } from 'react';
import RestaurantCard from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurantsData } from '@/lib/utils';

const OutletPage = () => {
  // Filter states
  const [sortBy, setSortBy] = useState('distance');
  const [filterDineIn, setFilterDineIn] = useState(false);

  // Sort and filter restaurants
  const displayedRestaurants = [...restaurantsData]
    .filter(restaurant => !filterDineIn || restaurant.dineinAvailable)
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.priceRange - b.priceRange;
      if (sortBy === 'priceDesc') return b.priceRange - a.priceRange;
      return 0;
    });

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Restaurants Near You
        </motion.h1>
        
        {/* Filters and Sorting */}
        <motion.div 
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <motion.select 
                id="sortBy" 
                className="rounded-lg bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </motion.select>
            </div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <input 
                id="dineInFilter" 
                type="checkbox" 
                className="h-4 w-4 text-indigo-600 border-gray-700 rounded focus:ring-indigo-500 bg-gray-800"
                checked={filterDineIn}
                onChange={() => setFilterDineIn(!filterDineIn)}
              />
              <label htmlFor="dineInFilter" className="ml-2 text-sm text-gray-300">Dine-in Only</label>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Restaurant Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {displayedRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {displayedRestaurants.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-400 text-lg">No restaurants found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OutletPage;