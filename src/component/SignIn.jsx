import React from 'react'
import { auth } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { collection} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { AddUser } from '../redux/userslicer';
import { getDocs } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import './css/Register.css';
export default function SignIn() {
    const nav=useNavigate()
    const dispatch=useDispatch();
    const usercollectionsRef=collection(db,"user");

    const[Data,setData]=useState({
    
        email:"",
        password:""
      });
      
      const handleChange=(event)=>{
        const {name,value}=event.target;
        setData(prev=>({
            ...prev,
            [name]:value,
        }))
    }
    const Submit=async()=>{
        try{
            await signInWithEmailAndPassword(auth,Data.email,Data.password)
            const dataDb=await getDocs(usercollectionsRef);
          
            
            let filterData=dataDb.docs.map((doc)=>({...doc.data(),id:doc.id}));
           
            const ReqData=filterData.filter((doc)=>{
              if(doc.email===auth.currentUser.email){
                
               return doc;
              }
              return false;
             
            })
            dispatch(AddUser(ReqData));
            nav('/');
        }
        catch(err){
            console.error(err);
        }
    }
  return (

    <div className='mainfr'>
    
        <div className='form' >
            <div className='header'><h1 style={{color:'#2368B2',fontSize:'43px',fontWeight:'600'}}>Sign In</h1>
            <h3 >Enter Your Creadentials to login</h3></div>
        
    <div className="mb-3 input" style={{width:"80%",marginLeft:"7%"}}>

      
      <input type="email" name='email' value={Data.email} className="form-control" aria-describedby="emailHelp" onChange={handleChange} placeholder="&#xf0e0;   Email" />
      
    </div>
    
    <div className="mb-3 input" style={{width:"80%",marginLeft:"7%"}}>
      
      <input type="password" name='password'  value={Data.password} className="form-control" onChange={handleChange} placeholder="&#xf023;   Password" />
    </div>
    
    <button className="btn btn-primary" style={{width:"80%",margin:'2% 3% 3% 7%',fontSize:'20px',fontWeight:'600'}} onClick={Submit}>Sign In</button>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',fontSize:'18px',marginLeft:'9%'}}>
        <h5>Don't have an account?</h5> <NavLink to='/register2' style={{textDecoration:'none',marginLeft:'14px'}} >Register</NavLink>
    </div>
    
    {/* <button onClick={SignIngoogle}>SignIn With Google</button> */}
  </div>
  <div className='img' style={{width:'40%',margin:'50px '}}>
    <img src='/assets/form-img.jpg' height='100%' width='100%' style={{borderRadius:'8px'}}></img>
  </div>
  </div>
    
  )
}
