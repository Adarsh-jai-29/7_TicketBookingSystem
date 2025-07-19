import React, { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useAppState } from '../state';

export const PaymentPage = () => {
    const { setCurrentPage, bookingData } = useAppState();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });

    const handlePayment = () => {
      setCurrentPage('confirmation');
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
          <div className="container mx-auto flex items-center">
            <button 
              onClick={() => setCurrentPage('seat-selection')}
              className="mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Movie:</span>
                  <span>{bookingData.movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Showtime:</span>
                  <span>{bookingData.showtime.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Theater:</span>
                  <span>{bookingData.showtime.theater}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats:</span>
                  <span>{bookingData.seats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets:</span>
                  <span>{bookingData.seats.length} x ₹{bookingData.showtime.price}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{bookingData.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Payment Details</h3>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      paymentMethod === 'card' ? 'bg-red-600' : 'bg-gray-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`px-4 py-2 rounded-lg ${
                      paymentMethod === 'upi' ? 'bg-red-600' : 'bg-gray-700'
                    }`}
                  >
                    UPI
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium mb-2">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Pay ₹{bookingData.totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };