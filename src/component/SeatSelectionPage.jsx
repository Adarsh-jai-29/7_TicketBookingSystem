import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppState } from '../state';


  export const SeatSelectionPage = () => {
 const { setCurrentPage, selectedMovie, selectedSeats, selectedShowtime, setSelectedSeats, bookingData, setBookingData,bookedSeats,setBookedSeats } = useAppState();

   useEffect(() => {
     if (selectedShowtime) {
      // Generate random booked seats ONLY ONCE
       const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const seatsPerRow = 12;
      const booked = [];
      rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
          const seatId = `${row}${i}`;
          if (Math.random() < 0.2) {  // Only runs once per showtime
            booked.push(seatId);
          }
        }
      });
      setBookedSeats(booked);  // Store permanently
    }
  }, [selectedShowtime]);
      
     // Generate seat layout
 const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const seats = [];

    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isBooked = bookedSeats.includes(seatId);
        seats.push({
          id: seatId,
          row: row,
          number: i,
          isBooked: isBooked,
          isSelected: selectedSeats.includes(seatId)
        });
      }
    });
  return seats;
  };

   const toggleSeat = (seatId, isBooked) => {
      if (isBooked) return;
      
      setSelectedSeats(prev => 
        prev.includes(seatId) 
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId]
      );
    };
    

    const seats = generateSeats();
    const totalPrice = selectedSeats.length * selectedShowtime.price;

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
          <div className="container mx-auto flex items-center">
            <button 
              onClick={() => setCurrentPage('movie-details')}
              className="mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Select Seats</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
            <p className="text-gray-400">{selectedShowtime.time} | {selectedShowtime.theater}</p>
          </div>

          {/* Screen */}
          <div className="text-center mb-8">
            <div className="w-80 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-full mx-auto mb-2"></div>
            <p className="text-gray-400">SCREEN</p>
          </div>

          {/* Seat Layout */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-2 mb-8">
              {seats.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id, seat.isBooked)}
                  className={`w-8 h-8 rounded-t-lg text-xs font-bold transition-colors ${
                    seat.isBooked 
                      ? 'bg-red-600 cursor-not-allowed' 
                      : seat.isSelected 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  disabled={seat.isBooked}
                >
                  {seat.id}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-600 rounded-t-sm mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-t-sm mr-2"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-t-sm mr-2"></div>
                <span className="text-sm">Booked</span>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <p className="mb-2">Selected Seats: {selectedSeats.join(', ')}</p>
                <p className="mb-4">Total Amount: ₹{totalPrice}</p>
                <button 
                  onClick={() => {
                    setBookingData({
                      movie: selectedMovie,
                      showtime: selectedShowtime,
                      seats: selectedSeats,
                      totalPrice: totalPrice
                    });
                    setCurrentPage('payment');
                  }}
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };