import { MovieDetailsPage } from './component/MovieDetailsPage';
import { SeatSelectionPage } from './component/SeatSelectionPage';
import { PaymentPage } from './component/PaymentPage';
import { ConfirmationPage } from './component/ConfirmationPage';
import { HomePage } from './component/HomePage';
import './App.css';
import { useAppState } from './state';

const App = () => {
  
const { currentPage } = useAppState();  

  // Page routing
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'movie-details':
        return <MovieDetailsPage />;
      case 'seat-selection':
        return <SeatSelectionPage />;
      case 'payment':
        return <PaymentPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      default:
        return <HomePage />;
    }
  };
  return renderPage();
};
export default App;