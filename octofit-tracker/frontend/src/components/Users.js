import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://urban-disco-r55rg4gw6vj2xvw5-8000.app.github.dev/api/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users
    .filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => {
      if (filter === 'all') return true;
      // This is a placeholder - in a real app, you would filter by actual user status
      if (filter === 'active') return Math.random() > 0.3; // Random for demo purposes
      if (filter === 'inactive') return Math.random() < 0.3; // Random for demo purposes
      return true;
    });

  if (loading) return (
    <div className="text-center py-5">
      <div className="loading-spinner mx-auto"></div>
      <p className="mt-3">Loading users...</p>
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
        <h2 className="section-heading">OctoFit Users</h2>
        
        <div className="d-flex align-items-center">
          <div className="input-group me-3" style={{ maxWidth: "300px" }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="btn-group">
            <button 
              type="button" 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'inactive' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('inactive')}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>
      
      <div className="row">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={user._id || index} className="col-md-6 col-xl-4 mb-4">
              <div className="octofit-card card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <div className="avatar bg-primary rounded-circle text-white me-3 d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                      {(user.username || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="card-title mb-0">{user.username}</h5>
                      <p className="card-text text-muted small mb-1">{user.email}</p>
                      <span className={`badge ${Math.random() > 0.3 ? 'bg-success' : 'bg-secondary'}`}>
                        {Math.random() > 0.3 ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-muted small mb-2">Activity Status:</h6>
                    <div className="progress" style={{ height: "6px" }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-wrap mb-3">
                    <span className="badge bg-info text-dark me-1 mb-1">Running</span>
                    <span className="badge bg-info text-dark me-1 mb-1">Cycling</span>
                    <span className="badge bg-info text-dark me-1 mb-1">Yoga</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-person-badge me-1"></i> Profile
                    </button>
                    <button className="btn btn-sm btn-octofit-success">
                      <i className="bi bi-person-plus me-1"></i> Add to Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center p-4">
              <i className="bi bi-people-fill fs-1 mb-3"></i>
              <h4>No users found</h4>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
