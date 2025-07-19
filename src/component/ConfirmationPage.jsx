import { useAppState } from '../state';

export const ConfirmationPage = () => {
  const { setCurrentPage, setSelectedSeats, setSelectedMovie, setSelectedShowtime, bookingData, setBookingData } = useAppState();
   return (
    <>
   <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Booking Confirmed</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-400">Your tickets have been booked successfully</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Ticket Details</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-mono">BK{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Movie:</span>
                <span>{bookingData.movie.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
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
              <div className="flex justify-between font-bold">
                <span>Total Paid:</span>
                <span>₹{bookingData.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors">
              Download Ticket
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setSelectedMovie(null);
                setSelectedShowtime(null);
                setSelectedSeats([]);
                setBookingData({});
              }}
              className="w-full bg-gray-600 hover:bg-gray-500 py-3 rounded-lg font-semibold transition-colors"
            >
              Book Another Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};