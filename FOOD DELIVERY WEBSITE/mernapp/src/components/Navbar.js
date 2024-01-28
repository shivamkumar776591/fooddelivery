import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge  from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import Cart from './Cart'
export default function Navbar() {


  const [cartView,setCartView] =useState(false);
  const navigate = useNavigate();

  const handleLogout = ()=>{
      localStorage.removeItem("authToken");
      navigate("/login");
  }
  const items = useCart();
  // console.log(items.length)
  // if(items.length == 0){
  //   console.log("length is 0");
  // }
  return (
   
    <div>
   
      <nav className="navbar   navbar-expand-lg navbar-dark bg-success" >
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
      <button className="navbar-toggler" type="button" items-bs-toggle="collapse" items-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2" >
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
          </li>
          {(localStorage.getItem("authToken"))?
            <li className='nav-item'>
              <Link  className="nav-link active fs-5" aria-current="page" to="/myOrder">MyOrders</Link>
            </li>
        
        :""}
          
        </ul>
        {(! localStorage.getItem("authToken"))?
        <div className='d-flex'>

        
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          
        
            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
           
         </div>
          :
          <div>
          <div className='btn bg-white text-success mx-2' onClick={()=>setCartView(true)}>
         MY Cart{" "}
          <Badge pill bg='danger' >{items.length}</Badge>
        
          </div>
          {cartView? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
          <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
            Logout
            </div>
            </div>
            }
      </div>
    </div>
  </nav>
  </div>
  )
}
