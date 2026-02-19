import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import toast from 'react-hot-toast'
import React from 'react'

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data)
      localStorage.setItem('token', res.data.token)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Sign in to your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

