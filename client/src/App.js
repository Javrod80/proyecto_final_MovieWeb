
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import MoviesSearch from './components/MoviesSearch';
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';
import './styles/Styles.css';
import { SearchProvider } from './providers/SearchProvider';
import Login from './pages/Login';
import { AuthProvider } from './providers/AuthContext';
import { FavoritesProvider } from './providers/FavoritesProvider';
import Profile from './components/Profile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from './components/SignupForm';
import WatchedProvider from './providers/WatchedProvider';
import MovieWatched from './components/MovieWatched';
import Reviews from './components/Reviews';
import { ReviewsProvider } from './providers/ReviewsProvider';



function App() {
  return (
    <AuthProvider>
    <FavoritesProvider>
        <SearchProvider>
          <WatchedProvider>
            <ReviewsProvider>
          <div className="MiApp">
            <ToastContainer />
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<MoviesSearch />} />
                <Route path="/movie/:imdbID" element={<MovieDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignupForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/watched" element={<MovieWatched />} />
                <Route path="/reviews" element={<Reviews />} />

              </Routes>
            </Router>
            <Footer />
          </div>
          </ReviewsProvider>
          </WatchedProvider>
        </SearchProvider>
        </FavoritesProvider>
    </AuthProvider>
  );
}



export default App;
