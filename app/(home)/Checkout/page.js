'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      router.push('/Cart');
    }
  }, [router]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Prepare order data
      const orderData = {
        amount: total,
        currency: 'INR',
        merchantId: process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID,
        merchantTransactionId: `ORDER_${Date.now()}`,
        merchantUserId: user?.id || 'guest',
        redirectUrl: `${window.location.origin}/payment/success`,
        redirectMode: 'POST',
        callbackUrl: `${window.location.origin}/api/payment/webhook`,
        mobileNumber: user?.primaryPhoneNumber?.phoneNumber || '',
        paymentInstrument: {
          type: 'UPI',
          targetApp: 'PHONEPE'
        }
      };

      // Call backend API to generate payment request
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        if (data.paymentUrl) {
          // Redirect to PhonePe payment page
          window.location.href = data.paymentUrl;
        } else if (data.qrCode) {
          // Show QR code for payment
          setQrCode(data.qrCode);
        }
      } else {
        throw new Error(data.message || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/Outlets')}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-lg p-6 border border-gray-800"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-white">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                  <p className="text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-semibold text-xl">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/phonepe-logo.png"
                  alt="PhonePe"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <p className="text-white font-medium">PhonePe UPI</p>
                  <p className="text-gray-400 text-sm">Pay using any UPI app</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          {qrCode && (
            <div className="mb-8 text-center">
              <h3 className="text-white mb-4">Scan QR Code to Pay</h3>
              <div className="bg-white p-4 rounded-lg inline-block">
                <Image
                  src={qrCode}
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          )}

          {/* Payment Button */}
          <motion.button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Processing...' : 'Pay with PhonePe'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
