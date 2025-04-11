import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    activity_type: 'Running',
    duration: '',
  });

  useEffect(() => {
    fetch('https://urban-disco-r55rg4gw6vj2xvw5-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json().catch(() => {
          console.error('Response is not valid JSON:', response);
          throw new Error('Invalid JSON response from server');
        });
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally submit the data to your API
    console.log('Submitting activity:', newActivity);
    setShowModal(false);
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="loading-spinner mx-auto"></div>
      <p className="mt-3">Loading your activities...</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Error: {error}</div>
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-heading">Activity Tracking</h2>
        <button 
          className="btn btn-octofit-primary" 
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>Log New Activity
        </button>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="octofit-card card mb-3">
            <div className="card-body text-center">
              <h3 className="h5 mb-3">This Week</h3>
              <h4 className="display-4 fw-bold">{activities.length}</h4>
              <p className="text-muted">Activities logged</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="octofit-card card mb-3">
            <div className="card-body text-center">
              <h3 className="h5 mb-3">Total Duration</h3>
              <h4 className="display-4 fw-bold">
                {activities.reduce((total, activity) => {
                  // This is a placeholder calculation for display
                  const duration = activity.duration || '1:00:00';
                  // Extract hours from duration string (simplified)
                  const hours = parseInt(duration.split(':')[0] || 0);
                  return total + hours;
                }, 0)}h
              </h4>
              <p className="text-muted">Hours of activity</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="octofit-card card mb-3">
            <div className="card-body text-center">
              <h3 className="h5 mb-3">Most Popular</h3>
              <h4 className="display-4 fw-bold text-truncate">
                {activities.length > 0 ? 
                  activities[0].activity_type || 'Running' : 
                  'N/A'}
              </h4>
              <p className="text-muted">Activity type</p>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table octofit-table table-hover mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map(activity => (
                  <tr key={activity._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar bg-primary rounded-circle text-white me-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                          {(activity.user?.username || 'U')[0].toUpperCase()}
                        </div>
                        {activity.user ? activity.user.username : 'Unknown User'}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {activity.activity_type}
                      </span>
                    </td>
                    <td>{activity.duration || '1:00:00'}</td>
                    <td>{new Date(activity.created_at || Date.now()).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="mb-0">No activities found. Start logging your fitness activities!</p>
                    <button 
                      className="btn btn-octofit-primary mt-2"
                      onClick={() => setShowModal(true)}
                    >
                      Log Your First Activity
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Activity Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log New Activity</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="activity_type" className="form-label">Activity Type</label>
                    <select 
                      className="form-select" 
                      id="activity_type" 
                      name="activity_type"
                      value={newActivity.activity_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Running">Running</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Weight Training">Weight Training</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Soccer">Soccer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (hh:mm:ss)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="duration" 
                      name="duration"
                      placeholder="01:00:00"
                      value={newActivity.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-octofit-primary">Save Activity</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
