import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '../services/api'
import toast from 'react-hot-toast'
import {EmployeeModal} from '../components/EmployeeModal'
import React from 'react'

export const Dashboard = () => {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [designation, setDesignation] = useState('')
  const [gender, setGender] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees({ search, department, designation, gender })
      setEmployees(res.data)
    } catch (err) {
      toast.error('Failed to fetch employees')
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [search, department, designation, gender])

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-indigo-600">Employee Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Sub header */}
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">All Employees ({employees.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
        >
          + Create Employee
        </button>
      </div>

      {/* Search and filters */}
      <div className="px-6 pb-4 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, email, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
        </select>
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">All Designations</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Analyst">Analyst</option>
          <option value="Intern">Intern</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <div className="px-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Designation</th>
                <th className="px-4 py-3 text-left">Gender</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {emp.photo ? (
                        <img
                          src={`http://localhost:5000/${emp.photo}`}
                          alt={emp.fullName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {emp.fullName?.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{emp.fullName}</td>
                    <td className="px-4 py-3 text-gray-500">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-500">{emp.phoneNumber}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.designation}</td>
                    <td className="px-4 py-3">{emp.gender}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchEmployees}
        />
      )}
    </div>
  )
}

