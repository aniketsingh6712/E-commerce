import React from 'react'
import { useSelector } from 'react-redux';
import { getDocs,collection,doc,deleteDoc,addDoc} from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { ClearItem } from '../../redux/productslicer';
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const products=useSelector((state)=>state.product);
    const User=useSelector((state)=>state.user);
    const usercollectionsRef=collection(db,"cart");
    const deliverycollection=collection(db,'delivery');
    const dispatch=useDispatch();
    const nav=useNavigate()
    const check=async ()=>{
        const dataDb=await getDocs(usercollectionsRef);
        let filterData=dataDb.docs.map((doc)=>({...doc.data(),id:doc.id}));
        filterData.filter(async (fildata)=>{
            if(fildata.userid===User[0][0].id){
                
                const data=doc(db,"cart",fildata.id);
                await deleteDoc(data);
            }
        })
        products.map(async (product)=>{
            await addDoc(deliverycollection,{user:User[0][0].id,productid:product.id,productname:product.title,quantity:product.qty,totalcost:(product.qty*product.price)});
        })
        dispatch(ClearItem());
        alert("Delivery has been Placed !");
        nav('/');
  
    }
    const Show=()=>{
        return(
            <>
            {products.map((product)=>{
                return(
                    <div>
                        <div className="my-7" style={{backgroundColor:"#D8E2E6",marginTop:"30px",paddingTop:'1em'}}>
            <div className="col-md-4" style={{margin:"10px 30%"}}>
                    <img src={product.image} alt={product.title} height="150px" width="150px" />
                </div>
                <div className="col-md-6" style={{margin:"0 30%"}}>
                <h3 >{product.title}</h3>
                <h3>${((product.qty*product.price*100)/100)}</h3>
                
                

                </div>
                </div>
                    </div>
                )
            })}
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'1em 0'}} >
                <button onClick={check}>Check out</button>
            </div>
            </>
        )
    }
  return (
    <div>
        <Show/>
    </div>
  )
}

export default Checkout