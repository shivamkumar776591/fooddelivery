import React, {useState } from 'react'
import history from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import css from '../'
import "./Main.css" 
// import './src/index.css'

import Navbar from  '../components/Navbar'
export default function Signup() {
  const [credential,setcredentials] = useState({name:"",email:"",password:"",adress:""});
  let navigate = useNavigate();
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/newuser",{
      method:'POST',
      headers:{
        'Content-Type' :'application/json',
        "Accept":"application/json"
      },
      body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password,adress:credential.adress})
    });
    const json = await response.json();
    navigate("/login");
    console.log(json);
  }
  const onchange =  (event)=>{
     setcredentials({...credential,[event.target.name ]: event.target.value})
  }
  return (

    <>
    <div><Navbar/> </div>
    
    <div className='container'>
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label for="name" className="form-label">FullName</label>
    <input type="text" className="form-control" name='name' value={credential.name} onChange={onchange}/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={onchange} value={credential.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="adress" className="form-label">Adress</label>
    <input type="text" className="form-control"  name='adress' onChange={onchange} value={credential.adress}/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onchange} value={credential.password}/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
  <Link to="/login"><button type="button" className="btn btn-primary bg-danger" style={{"margin-left":"20rem"}}> Already a User</button></Link>
 
</form>
</div>
    </>
  )
}