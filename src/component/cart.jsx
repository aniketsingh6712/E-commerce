import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddItem, DelItem } from '../redux/productslicer';
import { getDocs,collection,doc,updateDoc,deleteDoc,addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
    const state=useSelector((state)=>state.product);
    const User=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const usercollectionsRef=collection(db,"cart");
    const nav=useNavigate();
    const deleteitem=async (Product)=>{
        dispatch(DelItem(Product));
        const dataDb=await getDocs(usercollectionsRef);
        let filterData=dataDb.docs.map((doc)=>({...doc.data(),id:doc.id}));
        for(let i=0;i<filterData.length;i++){
            if(Product.id===filterData[i].productid && filterData[i].userid===User[0][0].id){
                if(filterData[i].quantity>1){
                
                    const data=doc(db,"cart",filterData[i].id);
                    await updateDoc(data,{quantity:filterData[i].quantity-1});
                    break;
                }
                else if(filterData[i].quantity===1){
                    const data=doc(db,"cart",filterData[i].id);
                    await deleteDoc(data);
                    break;
                }
            }
        }


    }

    //add product
    const directInsert=async (item)=>{
        try{
            await addDoc(usercollectionsRef,{userid:User[0][0].id,productid:item.id,productname:item.title,quantity:1});
        }
        catch(err){
            console.error(err);
    }
    }
   const additem= async (Product)=>{
        
        dispatch(AddItem(Product));
        
        const dataDb=await getDocs(usercollectionsRef);
        let filterData=dataDb.docs.map((doc)=>({...doc.data(),id:doc.id}));
        for(let i=0;i<filterData.length;i++){
        if(Product.id===filterData[i].productid && filterData[i].userid===User[0][0].id){
            
            const data=doc(db,"cart",filterData[i].id);
            await updateDoc(data,{quantity:filterData[i].quantity+1});
            break;
        }
        else if(Product.id!==filterData[i].productid && (i+1)!==filterData.length){
            continue;
            
        }
        else{
            await directInsert(Product);
            break;

        }
       }
       
   }
   // show that product in cart

    const Show=()=>{
        return(
    state.map((product)=>{
        if(product){
        return(
            <div className="my-7" style={{backgroundColor:"#D8E2E6",marginTop:"30px",paddingTop:'1em'}}>
            <div className="col-md-4" style={{margin:"10px 10%"}}>
                    <img src={product.image} alt={product.title} height="150px" width="150px" />
                </div>
                <div className="col-md-6" style={{margin:"0 20%"}}>
                <h3 >{product.title}</h3>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <p className="lead fw-bolder">
                        {product.qty} x ${product.price}=$
                        {(Math.round(product.qty*product.price*100)/100).toFixed(2)}
                    </p>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <i className="fa fa-solid fa-plus fs-4"  onClick={()=>additem(product)}></i>
                    <i class="fa fa-solid fa-minus fs-4"  onClick={()=>deleteitem(product)}></i>
                    </div>

                </div>
                </div>
            
            
          )
    }
}
)
        )
    }
    // show no item in cart

    const NotShow=()=>{
        return(
            <div style={{height:'54vh',textAlign:'center'}}>
                <h1>Cart is empty</h1>
            </div>
        )
    }
    //buy button
    const Checkout=()=>{
        return <>
        <div style={{margin:'20px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <button style={{backgroundColor:'orange'}} onClick={()=>{
               
                nav('/checkout');
            }
            }>Check out</button>
        </div>
        </>
    }
  return (
    <div style={{margin:"40px 30%"}}>{state.length>0?<><Show/><Checkout/></>:<NotShow/> }</div>
  )
}

