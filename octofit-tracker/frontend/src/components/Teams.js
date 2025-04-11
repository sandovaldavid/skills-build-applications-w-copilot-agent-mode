import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    teamType: 'public',
  });

  useEffect(() => {
    fetch('https://urban-disco-r55rg4gw6vj2xvw5-8000.app.github.dev/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({
      ...newTeam,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating team:', newTeam);
    setShowModal(false);
    document.body.classList.remove('modal-open');
  };

  const openModal = () => {
    setShowModal(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open');
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="loading-spinner mx-auto"></div>
      <p className="mt-3">Loading teams...</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Error: {error}</div>
    </div>
  );

  // Group teams into featured and regular
  const featuredTeams = teams.slice(0, 1);
  const regularTeams = teams.slice(1);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-heading">Fitness Teams</h2>
        
        <button 
          className="btn btn-octofit-primary" 
          onClick={openModal}
        >
          <i className="bi bi-people-fill me-2"></i>Create New Team
        </button>
      </div>

      {featuredTeams.length > 0 && (
        <div className="mb-4">
          <div className="octofit-card card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Featured Team</h5>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <div className="avatar bg-primary rounded-circle text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px", fontSize: "2.5rem" }}>
                    {featuredTeams[0].name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="h4 mb-0">{featuredTeams[0].name}</h3>
                  <p className="text-muted mb-0">Active Members: {featuredTeams[0].members?.length || 0}</p>
                </div>
                <div className="col-md-8">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-trophy-fill text-warning me-2 fs-4"></i>
                    <h4 className="h5 mb-0">Team Achievements</h4>
                  </div>
                  <div className="progress mb-3" style={{ height: "20px" }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%" }}>
                      75% to next level
                    </div>
                  </div>
                  <div className="mb-3 d-flex flex-wrap">
                    <span className="badge bg-success me-2 mb-2 p-2">Most Active</span>
                    <span className="badge bg-info me-2 mb-2 p-2">Highest Streak</span>
                    <span className="badge bg-warning text-dark me-2 mb-2 p-2">Top Runners</span>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2">View Details</button>
                    <button className="btn btn-octofit-success">Join Team</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {regularTeams.length > 0 ? (
          regularTeams.map(team => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="octofit-card card h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{team.name}</h5>
                  <span className="badge bg-light text-dark">
                    {team.members ? team.members.length : 0} members
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-4">
                    {team.description || 'A fitness team focused on achieving fitness goals together through mutual support and friendly competition.'}
                  </p>
                  
                  <h6 className="mb-3">Top Members</h6>
                  <ul className="list-group list-group-flush">
                    {team.members && team.members.slice(0, 3).map((member, idx) => (
                      <li key={member._id || idx} className="list-group-item px-0 d-flex align-items-center">
                        <div className="avatar bg-primary rounded-circle text-white me-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                          {member.username ? member.username[0].toUpperCase() : 'U'}
                        </div>
                        <span>{member.username}</span>
                        {idx === 0 && <span className="ms-2 badge bg-warning text-dark">Captain</span>}
                      </li>
                    ))}
                  </ul>
                  
                  {team.members && team.members.length > 3 && (
                    <p className="mt-2 text-muted">+ {team.members.length - 3} more members</p>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-info-circle me-1"></i> Details
                  </button>
                  <button className="btn btn-sm btn-octofit-success">
                    <i className="bi bi-person-plus me-1"></i> Join
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info p-4">
              <h4><i className="bi bi-people me-2"></i>No teams available</h4>
              <p className="mb-3">Create your own team or join one to start tracking fitness goals together!</p>
              <button 
                className="btn btn-octofit-primary"
                onClick={openModal}
              >
                Create Your First Team
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for creating a new team */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create New Team</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeModal}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="teamName" className="form-label">Team Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="teamName" 
                        name="name" 
                        value={newTeam.name} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="teamDescription" className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="teamDescription" 
                        name="description" 
                        value={newTeam.description} 
                        onChange={handleInputChange} 
                        required 
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="teamType" className="form-label">Team Type</label>
                      <select 
                        className="form-select" 
                        id="teamType" 
                        name="teamType" 
                        value={newTeam.teamType} 
                        onChange={handleInputChange} 
                        required
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">Create Team</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Teams;
