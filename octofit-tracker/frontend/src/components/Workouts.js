import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetch('https://urban-disco-r55rg4gw6vj2xvw5-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter workouts by category
  const filteredWorkouts = workouts.filter(workout => {
    if (filterCategory === 'all') return true;
    return workout.focus_area === filterCategory;
  });

  if (loading) return (
    <div className="text-center py-5">
      <div className="loading-spinner mx-auto"></div>
      <p className="mt-3">Loading workout suggestions...</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Error: {error}</div>
    </div>
  );

  // Extract unique focus areas for filter
  const categories = ['all', ...new Set(workouts.map(workout => workout.focus_area || 'General'))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-heading">Personalized Workout Suggestions</h2>
        
        <div className="dropdown">
          <button className="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Filter: {filterCategory === 'all' ? 'All Categories' : filterCategory}
          </button>
          <ul className="dropdown-menu" aria-labelledby="filterDropdown">
            {categories.map(category => (
              <li key={category}>
                <button 
                  className={`dropdown-item ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Featured Workout */}
      {workouts.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="octofit-card card">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-md-4 bg-primary text-white p-4 d-flex flex-column justify-content-center">
                    <h3 className="h2 mb-3">Workout of the Day</h3>
                    <p className="lead mb-4">{workouts[0].description || "Challenge yourself with our specially selected workout for today!"}</p>
                    <div className="d-grid">
                      <button className="btn btn-light btn-lg">Start Now</button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="h3">{workouts[0].name || "Full Body HIIT"}</h3>
                        <div className="d-flex flex-wrap">
                          <span className="badge bg-primary me-2 mb-2">
                            {workouts[0].focus_area || "Full Body"}
                          </span>
                          <span className="badge bg-warning text-dark me-2 mb-2">
                            {workouts[0].difficulty || "Intermediate"}
                          </span>
                          <span className="badge bg-info text-dark me-2 mb-2">
                            {workouts[0].duration || "30 mins"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <h5><i className="bi bi-fire me-2"></i>Benefits</h5>
                          <ul className="list-unstyled">
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Burns calories efficiently</li>
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Improves cardiovascular health</li>
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Builds strength and endurance</li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h5><i className="bi bi-gear me-2"></i>Equipment</h5>
                          <ul className="list-unstyled">
                            <li><i className="bi bi-circle-fill text-primary me-2"></i>Dumbbells (optional)</li>
                            <li><i className="bi bi-circle-fill text-primary me-2"></i>Yoga mat</li>
                            <li><i className="bi bi-circle-fill text-primary me-2"></i>Water bottle</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="row">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.slice(workouts.length > 0 ? 1 : 0).map((workout, index) => (
            <div key={workout._id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="octofit-card card h-100">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{workout.name || `Workout ${index + 1}`}</h5>
                  <span className="badge bg-light text-dark">
                    {workout.difficulty || "Intermediate"}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description || "A well-rounded workout designed to improve your overall fitness and strength."}</p>
                  
                  <h6 className="mt-4 mb-2">Workout Details:</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-bullseye me-2 text-primary"></i>Focus Area</span>
                      <span className="badge bg-primary rounded-pill">
                        {workout.focus_area || "General Fitness"}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-bar-chart-fill me-2 text-warning"></i>Difficulty</span>
                      <span className="badge bg-warning text-dark rounded-pill">
                        {workout.difficulty || "Intermediate"}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-clock me-2 text-info"></i>Duration</span>
                      <span className="badge bg-info text-dark rounded-pill">
                        {workout.duration || "30 mins"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="card-footer d-grid">
                  <button className="btn btn-octofit-success">
                    <i className="bi bi-play-circle-fill me-2"></i>Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info p-4">
              <h4><i className="bi bi-activity me-2"></i>No workouts found</h4>
              <p>No workouts match your current filter. Try selecting a different category.</p>
              <button className="btn btn-primary mt-2" onClick={() => setFilterCategory('all')}>
                Show All Workouts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
