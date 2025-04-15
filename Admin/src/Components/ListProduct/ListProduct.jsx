import React, { use } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'        
import { useEffect } from 'react';
import { useState } from 'react';

const ListProduct = () => {
    const [allProducts, setAllProducts] = React.useState([]);
    
    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {setAllProducts(data)});
    };
    useEffect(() => {
        fetchInfo();
    },[])
    const remove_product = async(id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept:'application',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        await fetchInfo();
    }
    return(
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className='listproduct-format-main'>
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div> 
            <div className="listproduct-allproducts">
                <hr /> {allProducts.map((product,index) => {
                    return<> <div className='listproduct-format-main listproduct-format' key={index}>
                        <img src={product.image} className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img className='listproduct-remove-icon' src={cross_icon} onClick={()=>{remove_product(product.id)}} alt="" />

                    </div>
                    <hr />
                    </>
})}

            </div>
        </div>
    )
}

export default ListProduct
