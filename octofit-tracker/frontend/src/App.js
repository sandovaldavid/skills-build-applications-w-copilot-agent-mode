import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Component imports
const Activities = React.lazy(() => import('./components/Activities'));
const Leaderboard = React.lazy(() => import('./components/Leaderboard'));
const Teams = React.lazy(() => import('./components/Teams'));
const Users = React.lazy(() => import('./components/Users'));
const Workouts = React.lazy(() => import('./components/Workouts'));

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar sticky-top mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/assets/octofitapp-small.png" alt="OctoFit Logo" className="octofit-logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/activities">
                    <i className="bi bi-lightning-charge me-1"></i> Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i> Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/teams">
                    <i className="bi bi-people me-1"></i> Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/users">
                    <i className="bi bi-person me-1"></i> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/workouts">
                    <i className="bi bi-heart-pulse me-1"></i> Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <React.Suspense fallback={
            <div className="text-center py-5">
              <div className="loading-spinner mx-auto"></div>
              <p className="mt-3">Loading...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={
                <div>
                  <div className="welcome-hero p-5 text-center rounded">
                    <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
                    <p className="lead">Track your fitness journey, compete with friends, and reach your goals!</p>
                    <div className="d-flex justify-content-center gap-3">
                      <Link to="/activities" className="btn btn-light btn-lg px-4">Log Activity</Link>
                      <Link to="/leaderboard" className="btn btn-outline-light btn-lg px-4">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
