import React, { useState } from 'react'
import './campus-amb.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase-config';
import { signOut} from 'firebase/auth';
import { RemoveUser } from '../redux/userslicer';
import { useDispatch } from 'react-redux';
export default function NavBar2() {
  const state=useSelector((state)=>state.product);
  const User=useSelector((state)=>state.user);//[[{}]] like this values is there

  const nav=useNavigate();
  const dispatch=useDispatch();

  const logout=async ()=>{
    try{
      await signOut(auth);
      dispatch(RemoveUser(User));
      nav('/')
    }
    catch(err){
      console.error(err);
    }
  }
  const [top,setTop]=useState("navbar")
  function myFunction() { 
    
    if (top === "navbar") {
      setTop("navbar responsive");
      console.log(top)
    } else {
      setTop("navbar")
      console.log(top);
    }
  }


  return (
    <div className={top}>
            <div className="work">
            <NavLink className="navbar-brand fw-bold logo" to="/">LACOLLECTION</NavLink>
       
        <a href="#" className="btn btn-outline-dark" style={{textDecoration:"none",border:'none'}}><span className="icon" style={{fontSize:"24px",cursor:"pointer",marginRight: '20px',color:"white",padding:'2px'}} onClick={myFunction}>&#9776;</span></a>
            </div>
        <div className="sub-navbar">
           
            <ul >
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>
        <li clNavLinkssName="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        
      </ul>
      <div className='btn'>
        <NavLink to="/login" className="btn btn-outline-dark"><i className="fa fa-sign-in me-1"></i>Login</NavLink>
      <NavLink to="/register" className="btn btn-outline-dark "><i className="fa fa-user-plus me-1"></i>Register</NavLink>
      <NavLink to="/cart" className="btn btn-outline-dark ms-2"><i className="fa fa-shopping-cart me-1" ></i>Cart({state.length})</NavLink>
      {auth?.currentUser &&<button to="#" className="btn btn-outline-dark ms-2" onClick={logout}><i class="fa fa-solid fa-right-from-bracket"></i>Logout</button>}
      
      </div>
        </div>
    </div>
  )
}

