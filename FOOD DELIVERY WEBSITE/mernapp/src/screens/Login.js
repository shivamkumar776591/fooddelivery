import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import backgroundImg from '../images/login-bg.jpg';

export default function Login() {
  const [credential, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your login logic here
    const response = await fetch("http://localhost:5000/login/user",{
      method:'POST',
      headers:{
        'Content-Type' :'application/json',
        "Accept":"application/json"
      },
      body:JSON.stringify({email:credential.email,password:credential.password,})
    });
    const json = await response.json();
    console.log(json);
    if(!json.success){
      alert("Enter valid credentail");
    }
    else if(json.success){
      localStorage.setItem("userEmail",credential.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url("https://img.freepik.com/free-photo/flat-lay-arrangement-with-salad-box-sauce_23-2148247883.jpg?w=996&t=st=1683835661~exp=1683836261~hmac=922d0df66981eae6c072ace30878e3691ca1a8a71153ac162c6fce24b57bc9c9")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="col-lg-4 col-md-6 col-sm-8">
     
        <div className="card bg-light" style={{"borderRadius":"2rem"}}>
          
          <div className="card-body" style={{"color":"black"}} >
          {/* <h3 style={{"color":'black',"textAlign":'center'}}>User Login </h3> */}
            <h3 className="card-title text-center">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  onChange={handleChange}
                  value={credential.email}
                  required
                />
                <div id="emailHelp" className="form-text" placeholder='Email'>
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" placeholder='Password'>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={handleChange}
                  value={credential.password}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-warning" style={{"borderRadius":"1rem"}}>
                  Submit
                </button>
              </div>

              <div className="text-center mt-3">
                <Link to="/signup" className="text-decoration-none">
                  New User? Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
