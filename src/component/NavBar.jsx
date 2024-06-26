import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase-config';
import { signOut} from 'firebase/auth';
import { RemoveUser } from '../redux/userslicer';
import { useDispatch } from 'react-redux';

 function NavBar() {
  const state=useSelector((state)=>state.product);
  const User=useSelector((state)=>state.user);

  const nav=useNavigate();
  const dispatch=useDispatch()
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
  const [top,setTop]=useState("container")
  
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm ">
  <div className={top}>
    <NavLink className="navbar-brand fw-bold fs-4" to="/">LACOLLECTION</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" ></span>
    </button>
    <div className="collapse navbar-collapse subnav" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
      <div className="button">
        <NavLink to="/login" className="btn btn-outline-dark"><i className="fa fa-sign-in me-1"></i>Login</NavLink>
      <NavLink to="/register" className="btn btn-outline-dark ms-2"><i className="fa fa-user-plus me-1"></i>Register</NavLink>
      <NavLink to="/cart" className="btn btn-outline-dark ms-2"><i className="fa fa-shopping-cart me-1" ></i>Cart({state.length})</NavLink>
      {auth?.currentUser &&<button to="#" className="btn btn-outline-dark ms-2" onClick={logout}><i class="fa fa-solid fa-right-from-bracket"></i>Logout</button>}
      
      </div>
    </div>
  </div>
</nav>
</>
  )
}
export default NavBar;
