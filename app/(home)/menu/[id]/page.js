'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMenuById } from '@/lib/utils';
import Link from 'next/link';
import Cart from '@/components/ui/Cart';

const MenuPage = ({ params }) => {
  const { id } = params;
  const menuData = getMenuById(parseInt(id));
  const [selectedCategory, setSelectedCategory] = useState(menuData?.categories[0]?.name || '');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    let updatedItems;

    if (existingItem) {
      updatedItems = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Menu not found</h1>
          <Link href="/Outlets" className="text-indigo-400 hover:text-indigo-300">
            Return to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/Outlets" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Restaurants
          </Link>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex overflow-x-auto pb-4 mb-8 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {menuData.categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
                ${selectedCategory === category.name 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          {menuData.categories
            .find(cat => cat.name === selectedCategory)
            ?.items.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.isVegetarian && (
                      <span className="bg-green-900/90 text-green-300 text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        Vegetarian
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-red-900/90 text-red-300 text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        Spicy
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span className="text-lg font-bold text-indigo-400">₹{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  {item.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen) => (
                        <span 
                          key={allergen}
                          className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded"
                        >
                          Contains: {allergen}
                        </span>
                      ))}
                    </div>
                  )}
                  <motion.button
                    onClick={() => handleAddToCart(item)}
                    className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* Cart Component */}
      <Cart 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default MenuPage; 