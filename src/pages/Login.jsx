import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state)=>state.auth);
  const [form, setForm] = useState({email: "", password: ""})
  
  console.log(user);
  const handleChange = (e)=>setForm({...form, [e.target.name]: e.target.value});


  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(loginUser(form));
  };


  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" placeholder='Enter Your Email' name='email' value={form.email} onChange={handleChange} />
        <input type="password" placeholder='Enter Password' name='password' value={form.password} onChange={handleChange} />

        <button>{loading ? "Logging in...": "Login"}</button>
      </form>
    </div>
  )
}

export default Login