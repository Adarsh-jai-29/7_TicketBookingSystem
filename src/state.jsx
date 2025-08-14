// state.js
import { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);


  return (
    <AppStateContext.Provider value={{currentPage, setCurrentPage,selectedMovie, setSelectedMovie, selectedShowtime, setSelectedShowtime, 
      selectedSeats, setSelectedSeats, bookingData, setBookingData,bookedSeats, setBookedSeats}}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
