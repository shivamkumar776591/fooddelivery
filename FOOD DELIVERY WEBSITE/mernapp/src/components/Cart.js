import React from 'react';
// import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from 'axios';
// import  Stripe from 'stripe';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div >
        <div className='m-5 w-100 text-center fs-3' style={{"color":"white"}}>The Cart is Empty!</div>
      </div>
    );
  }

  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }
// const Stripe = new ('sk_test_51N05btSDWf3oqPOsPza0OlLeorRhtVRw7GrMfskhp01Dcdo8jXj925ErxG54FH45mxXkSAyUv0OcHOrERkp6uEFO00KBXF38Ki')
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);

    let orderData = {
      orderData: data,
      email: userEmail,
      order_date: new Date().toDateString()
    };

    console.log(orderData);

    axios
      .post('http://localhost:5000/create-checkout-session', orderData)
      .then(res => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch(err => console.log(err));

    // console.log('JSON RESPONSE:::::', response.status);
    // if (response.status === 200) {
    //   dispatch({ type: 'DROP' });
    // }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}

      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover ' style={{"color":"wheat"}}>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>img</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col' ></th>

              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td><img src={food.image} alt='nothing' style={{"width":"10rem","height":"7rem","border-radius":"18px"}}></img></td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><button value={"DEL"}  onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className='fs-2' style={{"color":"white"}}>Total Price: {totalPrice}/-</h1>
        </div>

        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
