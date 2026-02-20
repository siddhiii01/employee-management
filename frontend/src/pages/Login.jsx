import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { loginUser } from "../services/api";
import "./Login.css";

export const Login = () =>  {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data)
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-top" />
      <div className="login-bg-bottom" />
      <div className="login-card">
        <h1 className="login-logo">IDMS</h1>
        <p className="login-subtitle">Welcome to HR Admin Panel</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Enter Email </label>
            <input
              type="text"
              placeholder="admin@email.com"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-group">
            <label>Enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="login-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              Remember Me
            </label>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}