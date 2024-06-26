import React, {  useState } from 'react'
import { auth, googleProvider } from '../firebase/firebase-config'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { addDoc, collection} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const nav=useNavigate();
  const[Data,setData]=useState({
    
    email:"",
    password:"",
    number:"",
    username:""
  });
  
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setData(prev=>({
        ...prev,
        [name]:value,
    }))
}
const signIn=async ()=>{
  try{
    await createUserWithEmailAndPassword(auth,Data.email,Data.password);
  }
  catch(err){
    console.error(err);

  }
}
const SignIngoogle=async ()=>{
  try{
    await signInWithPopup(auth,googleProvider)
    
  }
  catch(err){
    console.error(err);
  }
};
const Submit=()=>{
   Details();
   signIn();
  setData({email:"",number:"",username:"",password:""})
  nav('/login');
}

//database
const usercollectionsRef=collection(db,"user");

  const Details=async()=>{
    try{
    //const data=await getDocs(usercollectionsRef);
    await addDoc(usercollectionsRef,{username:Data.username,Pno:Data.number,email:Data.email})
  }
    catch(err){
      console.error(err);
    }
  };
  


  return (
    <div style={{marginLeft:"100px"}}>
        <div style={{margin:"50px 25%",border:"1px solid black",borderRadius:"12px"}} >
        <div className="mb-3" style={{width:"50%",marginLeft:"70px"}}>
      <label for="exampleInputEmail1" className="form-label">UserName</label>
      <input type="text" name='username' value={Data.username} className="form-control" aria-describedby="emailHelp" onChange={handleChange}/>
      
    </div>
    <div className="mb-3" style={{width:"50%",marginLeft:"70px"}}>

      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" name='email' value={Data.email} className="form-control" aria-describedby="emailHelp" onChange={handleChange}/>
      
    </div>
    <div className="mb-3" style={{width:"50%",marginLeft:"70px"}}>
      <label  className="form-label">Phone</label>
      <input type="number" name='number' value={Data.number} className="form-control" aria-describedby="emailHelp" onChange={handleChange}/>
    </div>
    <div className="mb-3" style={{width:"50%",marginLeft:"70px"}}>
      <label for="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" name='password' value={Data.password} className="form-control" onChange={handleChange}/>
    </div>
    
    <button className="btn btn-primary" style={{margin:"10px 30%"}} onClick={Submit}>Submit</button>
    
    {/* <button onClick={SignIngoogle}>SignIn With Google</button> */}
  </div></div>
  
  )
  
}
