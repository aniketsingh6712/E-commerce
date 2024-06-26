import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/productslicer';
import { db } from '../firebase/firebase-config';
import { addDoc, collection,getDocs,updateDoc,doc} from 'firebase/firestore';
import { useSelector } from 'react-redux';
export default function Productdetails() {
    const [product, setproduct] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const usercollectionsRef=collection(db,"cart");
    
    const User=useSelector((state)=>state.user);
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setproduct(await response.data);
            console.log(response);
            setLoading(false);
        }
        getProduct();
    }, [])
    const Loading = () => {
        return (
            <>
               <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6">
                    <Skeleton height={50} width={300}/>
                    <Skeleton height={75}/>
                </div>
            </>
        )
    }
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
    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="400px" width="400px" />

                </div>
                <div className="col-md-6">

                    <h4 className="text-uppercase text-black-50">

                        {product.category}

                    </h4>

                    <h1 className="display-5">{product.title}</h1>

                    <p className="lead fw-bolder">

                        Rating {product.rating && product.rating.rate}

                        <i className="fa fa-star"></i>

                    </p>

                    <h3 className="display-6 fw-bold my-4">

                        $ {product.price}

                    </h3>

                    <p className="lead"> {product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={()=>additem(product)}>
                        Add to cart
                    </button>
                    <NavLink to="/cart" className="btn btn-dark ms-4 px-3 py-2" >
                        Go to cart
                    </NavLink>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
