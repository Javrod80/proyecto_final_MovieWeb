import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import MoviesSearch from './components/MoviesSearch';
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';
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
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './components/ChangePassword';
import AdminDashboard from './adminPages/AdminDashboard';
import RecoveryPassword from './components/RecoveryPassword';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <SearchProvider>
          <WatchedProvider>
            <ReviewsProvider>
              <Router>
                <ToastContainer />
                <Header />
                <div className="MiApp">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignupForm />} />
                    <Route path="/reset-password" element={<ChangePassword />} />
                    <Route path="/recovery-password" element={<RecoveryPassword/>} />

                    {/* 🔹 Las rutas protegidas dentro de PrivateRoute */}
                    <Route element={<PrivateRoute />}>
                      <Route path="/search" element={<MoviesSearch />} />
                      <Route path="/movie/:imdbID" element={<MovieDetails />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/watched" element={<MovieWatched />} />
                      <Route path="/reviews" element={<Reviews />} />
                      <Route path="/admin-dashboard" element={<AdminDashboard />} />
                     
                    </Route>
                    
                    <Route path="*" element={<h1>Not Found</h1>} />
                  </Routes>
                </div>
                <Footer />
              </Router>
            </ReviewsProvider>
          </WatchedProvider>
        </SearchProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
