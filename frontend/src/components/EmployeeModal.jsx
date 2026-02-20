import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {createEmployee} from '../services/api'
import './EmployeeModal.css'

const DEPARTMENTS = ['HR', 'Engineering', 'Product Development', 'Sales', 'Marketing', 'Finance', 'Operations']
const DESIGNATIONS = ['Software Developer', 'Senior Developer', 'Team Lead', 'Manager', 'HR Executive', 'Sales Executive', 'Analyst']
export const  EmployeeModal = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (key === 'photo') {
          if (data.photo[0]) formData.append('photo', data.photo[0])
        } else {
          formData.append(key, data[key])
        }
      });
      console.log('Formdata', formData)
      await createEmployee(formData)
      toast.success('Employee created successfully')
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create employee')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create OD Request</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            {/* Row 1 */}
            <div className="modal-row">
              <div className="modal-field">
                <label>Full Name <span className="required">*</span></label>
                <input
                  placeholder="Enter name"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && <span className="error">{errors.fullName.message}</span>}
              </div>

              <div className="modal-field">
                <label>Email <span className="required">*</span></label>
                <input
                  placeholder="Enter Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' }
                  })}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>

              <div className="modal-field">
                <label>Contact <span className="required">*</span></label>
                <input
                  placeholder="Enter contact"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: { value: /^\d{10}$/, message: 'Must be exactly 10 digits' }
                  })}
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}
              </div>

              <div className="modal-field">
                <label>Gender <span className="required">*</span></label>
                <select {...register('gender', { required: 'Gender is required' })}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error">{errors.gender.message}</span>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="modal-row">
              <div className="modal-field">
                <label>Date of Birth <span className="required">*</span></label>
                <input
                  type="date"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                />
                {errors.dateOfBirth && <span className="error">{errors.dateOfBirth.message}</span>}
              </div>

              <div className="modal-field">
                <label>Department <span className="required">*</span></label>
                <select {...register('department', { required: 'Department is required' })}>
                  <option value="">Select</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <span className="error">{errors.department.message}</span>}
              </div>

              <div className="modal-field">
                <label>Designation <span className="required">*</span></label>
                <select {...register('designation', { required: 'Designation is required' })}>
                  <option value="">Select</option>
                  {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.designation && <span className="error">{errors.designation.message}</span>}
              </div>

              <div className="modal-field">
                <label>Employee Photo <span className="required">*</span></label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  {...register('photo')}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}