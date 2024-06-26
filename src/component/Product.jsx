import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

export default function Product() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    
    let componentMounted = true;
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await axios.get('https://fakestoreapi.com/products').catch((err) => {
                console.log('error', err);
            });
            
            if (componentMounted) {
                setData(await response.data);
                setFilter(await response.data);
                setLoading(false);
                
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);
    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        )
    }
    const FilterProduct=(cat)=>{
        const updateList=data.filter((x)=>x.category===cat);
        setFilter(updateList);
    }
    const ShowProduct = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb5">
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>
                        All
                    </button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>FilterProduct("men's clothing")}>
                        Men 's Clothing
                    </button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>FilterProduct("women's clothing")}>
                        Women 's Clothing
                    </button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>FilterProduct("jewelery")}>
                        Jewelery
                    </button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>FilterProduct("electronics")}>
                        Electronic
                    </button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-5" key={product.id}>
                                    <img src={product.image} className="card-img-top" height="250px" alt={product.title} />
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">{product.title.substring(0,12)}...</h5>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/product/${product.id}`} className="btn btn-outline-dark" >Buy Now</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />

                    </div>

                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
