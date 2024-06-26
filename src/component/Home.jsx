import React, { useEffect } from 'react'
import Product from './Product'
import { getDocs,collection} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useDispatch,useSelector } from 'react-redux';
import { AddItem } from '../redux/productslicer';
import axios from 'axios';

export default function () {
  const dispatch=useDispatch();
  const User=useSelector((state)=>state.user);
  const usercollectionsRef=collection(db,"cart");
  const getData=async ()=>{
    if(User.length>0){
      const dataDb=await getDocs(usercollectionsRef);
      
      let filterData=dataDb.docs.map((doc)=>({...doc.data(),id:doc.id}));
      
      filterData.map(async (data)=>{
        if(data.userid===User[0][0].id){
          console.log(data.productid)
          const response = await axios.get(`https://fakestoreapi.com/products/${data.productid}`)
          for(let i=0;i<data.quantity;i++){
            dispatch(AddItem(response.data));
          }
          
        }
      })
  }
}
  useEffect(()=>{
    getData();
      
    

  },[])
  

  return (
    <div classNameName='hero'>

<div className="card bg-dark text-white border-0">
  <img src="/assets/bg.jpg" className="card-img" alt="background" height="565px"/>
  <div className="card-img-overlay d-flex flex-column justify-content-center">
    <div classNameName="container">


    
    <h5 className="card-title display-3 fw-bolder mb-0 text-info">NEW SEASON ARRIVALS</h5>
    <p className="card-text lead fs-2 text-secondary">CHECK OUT ALL THE TRENDS</p>
    
    </div>
  </div>
</div>
<Product/>
    </div>
  )
}
