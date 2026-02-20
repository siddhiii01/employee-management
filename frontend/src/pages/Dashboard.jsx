import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEmployees } from '../services/api'
import Sidebar from '../components/Sidebar'

import userAvatar from '../Assets/user_avatar.svg'
import searchIcon from '../Assets/search_icon.svg'
import noRecords from '../Assets/no_records.svg'
import photoIcon from '../Assets/photo.svg'
import actionIcon from '../Assets/action.svg'
import './Dashboard.css'
import { EmployeeModal } from '../components/EmployeeModal'

export const Dashboard = () =>  {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('');
  const searchTimeout = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState(null)
  const navigate = useNavigate()

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees({ search } )
      setEmployees(res.data.data || []);
    } catch (err) {
      toast.error('Failed to fetch employees')
    }
  }

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchEmployees();
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <span className="header-logo">IDMS</span>
          <div className="header-divider" />
        </div>
        <div className="header-right">
          <img
            src={userAvatar}
            alt="user"
            className="avatar-icon"
            onClick={handleLogout}
            title="Click to logout"
          />
        </div>
      </div>

      <div className="dashboard-body">
        <Sidebar />

        <div className="main-content">
          {/* Sub header */}
          <div className="sub-header">
            <h2>Employee Setup</h2>
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <img src={searchIcon} alt="search" className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="create-btn" onClick={() => setShowModal(true)}>
              + Create
            </button>
          </div>

          {/* Table area */}
          <div className="table-area">
            {employees.length === 0 ? (
              <div className="empty-state">
                <img src={noRecords} alt="no records" className="no-records-icon" />
                <p>No Records to be displayed</p>
              </div>
            ) : (
              <table className="emp-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Photo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.fullName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phoneNumber}</td>
                      <td>{emp.gender}</td>
                      <td>{new Date(emp.dateOfBirth).toLocaleDateString('en-GB')}</td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>
                        {emp.photo ? (
                          <img
                            src={photoIcon}
                            alt="photo"
                            className="photo-icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPreviewPhoto(emp.photo)}
                          />
                        ) : (
                          <img src={photoIcon} alt="photo" className="photo-icon" />
                        )}
                      </td>
                      <td>
                        <img
                          src={actionIcon}
                          alt="action"
                          className="action-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          {/* Footer - Pinned to bottom */}
          <div className="table-footer">
            <div className="total-records">
              Total Records -&gt; {employees.length}
            </div>
            <div className="pagination">
              <button>&lt;-</button>
              <span>Page</span>
              <input type="number" defaultValue={1} readOnly />
              <button>-&gt;</button>
          </div>
          </div>
        </div>
      </div>

      {previewPhoto && (
        <div className="photo-overlay" onClick={() => setPreviewPhoto(null)}>
          <div className="photo-popup" onClick={(e) => e.stopPropagation()}>
            <button className="photo-popup-close" onClick={() => setPreviewPhoto(null)}>✕</button>
            <img src={previewPhoto} alt="Employee" className="photo-popup-img" />
          </div>
        </div>
      )}

      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchEmployees}
        />
      )}
    </div>
  )
}