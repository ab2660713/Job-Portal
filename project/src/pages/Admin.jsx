      import { useEffect, useState } from "react";
      import {
        FaUsers,
        FaBriefcase,
        FaBuilding,
        FaChartLine,
        FaTrash,
        FaCheck,
        FaTimes,
        FaMapMarkerAlt,
        FaTags,
      } from "react-icons/fa";
      import "./Admin.css";
      import { useDispatch, useSelector } from "react-redux";
      import {
        getAdminStats,
        getAllJobs,
        getAllUsers,
        toggleUserStatus,
        changeUserRole,
        deleteUser,
        adminDeleteJob,
        toggleJobStatus,
      } from "../features/admin/adminSlice";

      import Loader from "../components/Loader";

      const Admin = () => {
        const [activeTab, setActiveTab] = useState("dashboard");
        const dispatch = useDispatch();

        const { user } = useSelector((state) => state.auth);
        const {
          allUsers,
          allJobs,
          stats,
          adminLoading,
          adminError,
          adminErrorMessage,
        } = useSelector((state) => state.admin);
        useEffect(() => {
          if (user?.token) {
            dispatch(getAllUsers());
            dispatch(getAllJobs());
            dispatch(getAdminStats());

          }
        }, [dispatch, user]);

        if (adminLoading && activeTab === "dashboard") {
          return <Loader />;
        }
        

        return (
          <div className="admin-page">
            <div className="admin-container">
              {/* SIDEBAR */}
              <div className="admin-sidebar">
                <div className="admin-sidebar-header">
                  <h2>Admin Panel</h2>
                </div>

                <nav className="admin-nav">
                  <button
                    className={`admin-nav-btn ${
                      activeTab === "dashboard" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <FaChartLine /> Dashboard
                  </button>

                  <button
                    className={`admin-nav-btn ${
                      activeTab === "users" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("users")}
                  >
                    <FaUsers /> Manage Users
                  </button>

                  <button
                    className={`admin-nav-btn ${
                      activeTab === "jobs" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("jobs")}
                  >
                    <FaBriefcase /> Manage Jobs
                  </button>
                </nav>
              </div>

              {/* CONTENT */}
              <div className="admin-content">
                {/* ================= DASHBOARD ================= */}
                {activeTab === "dashboard" && (
                  <div className="admin-section">
                    <h1>Dashboard Overview</h1>
                    <p className="section-subtitle">
                      System statistics and metrics
                    </p>

                    <div className="admin-stats-grid">
                      <div className="admin-stat-card">
                        <div className="stat-icon users">
                          <FaUsers />
                        </div>
                        <div className="stat-info">
                          <h3>{stats?.totalUsers}</h3>
                          <p>Total Users</p>
                        </div>
                      </div>

                      <div className="admin-stat-card">
                        <div className="stat-icon jobs">
                          <FaBriefcase />
                        </div>
                        <div className="stat-info">
                          <h3>{stats?.totalJobs}</h3>
                          <p>Total Jobs</p>
                          <span className="stat-change positive">
                            +{stats?.newJobsThisWeek} this week
                          </span>
                        </div>
                      </div>

                      <div className="admin-stat-card">
                        <div className="stat-icon employers">
                          <FaBuilding />
                        </div>
                        <div className="stat-info">
                          <h3>{stats?.totalEmployers}</h3>
                          <p>Total Employers</p>
                        </div>
                      </div>

                      <div className="admin-stat-card">
                        <div className="stat-icon applications">
                          <FaChartLine />
                        </div>
                        <div className="stat-info">
                          <h3>{stats?.totalApplications}</h3>
                          <p>Total Applications</p>
                          <span className="stat-change positive">
                            +{stats?.applicationsThisWeek} this week
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CHART */}
                    <div className="admin-charts">
                      <div className="chart-card">
                        <h3>Active vs Inactive Jobs</h3>
                        <div className="chart-placeholder">
                          <div className="chart-bar active">
                            Active: {stats?.activeJobs}
                          </div>
                          <div className="chart-bar inactive">
                          Inactive: {(stats?.totalJobs || 0) - (stats?.activeJobs || 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= USERS ================= */}
                {activeTab === "users" && (
                  <div className="admin-section">
                    <h1>Manage Users</h1>
                    <p className="section-subtitle">
                      View all registered users
                    </p>

                    <div className="admin-table-container">
                      <table className="admin-table">
                      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
    {allUsers.map((u) => (
      <tr key={u._id}>
        <td>{u.name}</td>
        <td>{u.email}</td>

        <td>
          <span className="role-badge">{u.role}</span>
        </td>

        <td>
        <span
    className={`status-badge ${u.status === "active" ? "active" : "inactive"}`}
  >
    {u.status === "active" ? "Active" : "Inactive"}
  </span>

        </td>

        <td>{new Date(u.joined).toLocaleDateString()}</td>

        <td>
          <div className="table-actions">
            {/* ACTIVATE / DEACTIVATE */}
            {u.role !== "admin" && (
              <button
                className="table-action-btn"
                title="Toggle Status"
                onClick={() => dispatch(toggleUserStatus(u._id))}
              >
                {u.status === "active" ? <FaTimes /> : <FaCheck />}
              </button>
            )}

            <select
              className="role-select"
              value={u.role}
              title="Change role"
              onChange={(event) =>
                dispatch(
                  changeUserRole({
                    id: u._id,
                    role: event.target.value,
                  })
                )
              }
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
              <option value="admin">Admin</option>
            </select>


            {/* DELETE USER */}
            {u.role !== "admin" && (
              <button
                className="table-action-btn delete"
                title="Delete User"
                onClick={() => {
                  if (window.confirm("Delete this user?")) {
                    dispatch(deleteUser(u._id));
                  }
                }}
              >
                <FaTrash />
              </button>
            )}
          </div>
        </td>
      </tr>
    ))}
  </tbody>


                      </table>
                    </div>
                  </div>
                )}

                {/* ================= JOBS ================= */}
                {activeTab === "jobs" && (
                  <div className="admin-section">
                    <h1>Manage Jobs</h1>
                    <p className="section-subtitle">
                      View all job postings
                    </p>

                    <div className="admin-jobs-grid">
                    {allJobs.map((job) => (
                      <div key={job._id} className="admin-job-card">
  <div className="admin-job-header">
    <div>
      <h3>{job.title}</h3>
      <p className="admin-job-company">
        {job.createdBy?.companyName || job.createdBy?.name || "Company"}
      </p>
    </div>

    <span
      className={`job-status-badge ${
        job.status === "active" ? "active" : "inactive"
      }`}
    >
      {job.status?.toUpperCase()}
    </span>
  </div>

  <div className="admin-job-meta">
    <span><FaMapMarkerAlt /> {job.location}</span>
    <span><FaBriefcase /> {job.type}</span>
    <span><FaTags /> {job.category}</span>
  </div>

  <div className="admin-job-actions">
    <button
      className="admin-action-btn toggle"
      onClick={() => dispatch(toggleJobStatus(job._id))}
    >
      {job.status === "active" ? "Deactivate" : "Activate"}
    </button>

    <button
      className="admin-action-btn delete"
      onClick={() => {
        if (window.confirm("Delete this job?")) {
          dispatch(adminDeleteJob(job._id));
        }
      }}
    >
      Delete
    </button>
  </div>
</div>
))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      };

      export default Admin;
