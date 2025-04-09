'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const Cart = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [items]);

  const handleCheckout = () => {
    router.push('/Cart');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        className="bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Your Cart</h3>
            <span className="text-gray-400">{items.length} items</span>
          </div>

          <div className="max-h-60 overflow-y-auto mb-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <p className="text-white">{item.name}</p>
                  <p className="text-gray-400 text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-400 hover:text-white"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-400 ml-2"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart; 