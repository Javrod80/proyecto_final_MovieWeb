
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
import Login from './components/Login';
import { AuthProvider } from './providers/AuthContext';
import { FavoritesProvider } from './providers/FavoritesProvider';
import Profile from './components/Profile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from './components/SignupForm';



function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <SearchProvider>
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
              </Routes>
            </Router>
            <Footer />
          </div>
        </SearchProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}



export default App;
