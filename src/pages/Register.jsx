import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import "../css/register.css"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {


      await dispatch(registerUser(formData)).unwrap();
      navigate("/login");

    } catch (error) {
      setError(error || "Registration failed");
    }
  }
  return (
    <div className='register'>
      <div className='form-wrapper'>
        <h1>Evento Registration</h1>



        {
          error ? <p>{typeof error === "string" ? error : error.message || "Registration failed"}</p> : null
        }


        <form action="" onSubmit={handleSubmit} >

          <input
            type="text"
            name='name'
            placeholder='Enter Full Name'
            value={formData.name}
            onChange={handleChange}
            minLength={3}
            maxLength={25}
            autoComplete='off'
          />

          <input
            type="email"
            name="email"
            placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange}
            autoComplete='off'
          />

          <input
            type="password"
            name="password"
            placeholder='Enter Strong Password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
          />

          <div className="form-controls">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
            <button type='submit'>Register</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Register