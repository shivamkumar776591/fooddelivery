import React, { useEffect, useState,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {
let dispatch = useDispatchCart();
let data = useCart();
    let options  = props.options;
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    // const sizeRef = useRef();
    const [qty,setQty]=useState(1);
    const [size,setSize] = useState("") 
    const handleAddCart = async()=>{
         let food = [];
         for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
         }
        //  console.log(food);
         if(food.size != 0){
            if(food.size === size){
                await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
                return
            }
            else if(food.size !== size){
                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,image: props.foodItem.image})
                return;
            }
            return;
         }
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        console.log(data)
    }
    let finalPrice = qty*parseInt(options[size]);
    useEffect(()=>{
        setSize (priceRef.current.value)
        // setQty(sizeRef.current.value)
    },[])
    
    return (
        <div><div className="card mt-3 bg-dark text-white" style={{ "width": "18rem", "maxHeight": "360px","margin":"1rem" }}>
            <img src={props.foodItem.image} className="card-img-top" alt="..." style={{"maxHeight":"120px","objectFit":"fill"
        }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
             
                <div className='container w-100'>
                    <select className='m-2 h-100  bg-success rounded'  onChange={(e)=>setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1} </option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                        {priceOptions.map((data)=>{
                            return <option key ={data} value ={data}>{data}</option>
                        })}
                    </select>

                    <div className='d-inline h-100 fs-5'></div>
                            {finalPrice}/-
                </div>
                <hr></hr>
                <button className={'btn btn-success justify-center ms-2'} onClick={handleAddCart}>Add to Cart</button>

            </div>
        </div></div>
    )
}
