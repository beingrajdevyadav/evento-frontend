import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
    profile: "",
    profilePic: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        profilePic: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await dispatch(registerUser(formDataToSend)).unwrap();
      navigate("/login");

    } catch (error) {
      setError(error || "Registration failed");
    }
  }
  return (
    <div>
      <h2>User Registration</h2>
      <hr />

      {
        error && <p>{error}</p>
      }

      <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>

        <input
          type="text"
          name='name'
          placeholder='Enter Full Name'
          value={formData.name}
          onChange={handleChange}
          minLength={3}
          maxLength={25}
        />

        <input
          type="email"
          name="email"
          placeholder='Enter Your Email'
          value={formData.email}
          onChange={handleChange}

        />

        <input
          type="password"
          name="password"
          placeholder='Enter Strong Password'
          value={formData.password}
          onChange={handleChange}

        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>

        <input 
        type="file" 
        name="profilePic" 
        id=""
        onChange={handleChange}
         />

         <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register