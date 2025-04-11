import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('weekly');

  useEffect(() => {
    fetch('https://urban-disco-r55rg4gw6vj2xvw5-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center py-5">
      <div className="loading-spinner mx-auto"></div>
      <p className="mt-3">Loading leaderboard rankings...</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Error: {error}</div>
    </div>
  );

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-heading">Fitness Leaderboard</h2>
        
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn ${timeRange === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button 
            type="button" 
            className={`btn ${timeRange === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button 
            type="button" 
            className={`btn ${timeRange === 'yearly' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="row mb-4">
        {sortedLeaderboard.slice(0, 3).map((entry, index) => (
          <div key={entry._id || index} className="col-md-4">
            <div className={`octofit-card card mb-3 ${index === 0 ? 'border-warning' : index === 1 ? 'border-secondary' : 'border-danger'}`}>
              <div className={`card-header text-center ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary text-white' : 'bg-danger text-white'}`}>
                <h4 className="mb-0">
                  {index === 0 ? '🥇 1st Place' : index === 1 ? '🥈 2nd Place' : '🥉 3rd Place'}
                </h4>
              </div>
              <div className="card-body text-center">
                <div className="avatar bg-primary rounded-circle text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
                  {(entry.user?.username || 'U')[0].toUpperCase()}
                </div>
                <h5 className="card-title">{entry.user ? entry.user.username : 'Unknown User'}</h5>
                <p className="card-text">
                  <span className="display-6 fw-bold">{entry.score}</span>
                  <br/>points
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="table-container">
        <div className="table-responsive">
          <table className="table octofit-table table-hover mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Achievement</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.length > 0 ? (
                sortedLeaderboard.map((entry, index) => (
                  <tr key={entry._id || index}>
                    <td>
                      <span className={`badge rounded-pill ${
                        index === 0 ? 'bg-warning text-dark' : 
                        index === 1 ? 'bg-secondary text-white' : 
                        index === 2 ? 'bg-danger text-white' : 
                        'bg-light text-dark'
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar bg-primary rounded-circle text-white me-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                          {(entry.user?.username || 'U')[0].toUpperCase()}
                        </div>
                        {entry.user ? entry.user.username : 'Unknown User'}
                      </div>
                    </td>
                    <td><strong>{entry.score}</strong> points</td>
                    <td>
                      {index === 0 && <span className="badge bg-warning text-dark">🥇 Gold</span>}
                      {index === 1 && <span className="badge bg-secondary">🥈 Silver</span>}
                      {index === 2 && <span className="badge bg-danger">🥉 Bronze</span>}
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="progress" style={{ height: "10px" }}>
                        <div 
                          className={`progress-bar ${
                            index === 0 ? 'bg-warning' : 
                            index === 1 ? 'bg-secondary' : 
                            index === 2 ? 'bg-danger' : 
                            'bg-primary'
                          }`}
                          role="progressbar" 
                          style={{ width: `${Math.max(entry.score, 10)}%` }}
                          aria-valuenow={entry.score} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="mb-0">No leaderboard data available yet.</p>
                    <a href="/activities" className="btn btn-octofit-primary mt-2">
                      Start logging activities to climb the ranks!
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
