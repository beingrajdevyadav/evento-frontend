import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice';
import "../css/login.css";
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  console.log(user);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
    setForm({ email: "", password: "" });

    if (user) {
      navigate("/home");
    }
    if (user === null) {
      console.log("Invalid credentials");
    }
  };


  return (
    <div className='login'>
      <form action="" onSubmit={handleSubmit}>
        <h1>Evento Login</h1>

        <input 
        type="email" 
        placeholder='Enter Your Email' 
        name='email' 
        value={form.email} 
        onChange={handleChange}
        autoComplete='off'
         />

        <input 
        type="password" 
        placeholder='Enter Password' 
        name='password' 
        value={form.password} 
        onChange={handleChange} 
        autoComplete='off'
        />

        <button>{loading ? "Logging in..." : "Login"}</button>
     
     <NavLink to="/register" className="register-link">
        Don't have an account? Register here
      </NavLink>
      </form>
    </div>
  )
}

export default Login