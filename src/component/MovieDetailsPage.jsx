import React from 'react';
import { ArrowLeft, Clock, MapPin, Star } from 'lucide-react';
import { useAppState } from '../state';

 
 export const MovieDetailsPage = () => {
  const { setCurrentPage, selectedMovie, setSelectedShowtime } = useAppState();
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mr-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Movie Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full rounded-lg" />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
            <div className="flex items-center mb-4 space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1">{selectedMovie.rating}</span>
              </div>
              <span className="text-gray-400">{selectedMovie.genre}</span>
              <span className="text-gray-400">{selectedMovie.duration}</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">{selectedMovie.description}</p>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Select Showtime</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedMovie.showtimes.map(showtime => (
                  <div 
                    key={showtime.id}
                    onClick={() => {
                      setSelectedShowtime(showtime);
                      setCurrentPage('seat-selection');
                    }}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{showtime.time}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{showtime.theater}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">₹{showtime.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )}