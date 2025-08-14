import { Search, User, Star } from 'lucide-react';
import { useAppState } from '../state';
import { movies } from '../data/movies';
import { useState } from 'react';

 export const HomePage = () => {
  const { setCurrentPage, setSelectedMovie } = useAppState();
  
  const [searchTerm, setSearchTerm] = useState('');

   const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold animate-bounce">CineMax</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                 value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-[20vw] bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="p-2 hidden md:block rounded-lg bg-gray-800 hover:bg-gray-700">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Book Your Movie Tickets</h2>
          <p className="text-xl text-gray-300 mb-8">Experience the magic of cinema with the best seats in town</p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Explore Movies
          </button>
        </div>
      </section>

      {/* Now Showing */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Now Showing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="bg-gray-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer">
                <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{movie.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{movie.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">{movie.duration}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedMovie(movie);
                      setCurrentPage('movie-details');
                    }}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )}