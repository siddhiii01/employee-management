import { useForm } from 'react-hook-form'
import { createEmployee } from '../services/api'
import toast from 'react-hot-toast'
import React from 'react'

export const EmployeeModal = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (key === 'photo') {
          formData.append('photo', data.photo[0])
        } else {
          formData.append(key, data[key])
        }
      })
      await createEmployee(formData)
      toast.success('Employee created successfully')
      onSuccess()
      onClose()
    } catch (err) {
      toast.error('Failed to create employee')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Employee</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Phone must be exactly 10 digits' }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="10 digit number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              {...register('department', { required: 'Department is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="text-sm font-medium text-gray-700">Designation</label>
            <select
              {...register('designation', { required: 'Designation is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none"
            >
              <option value="">Select Designation</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Analyst">Analyst</option>
              <option value="Intern">Intern</option>
            </select>
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm font-medium text-gray-700">Employee Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

