import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {food_list, promo_code,cartItems,removeFromCart,getTotalCartAmount}=useContext(StoreContext);
  const [inputData , setInputData] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputData(e.target.value);
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
        <p>Item</p>
        <p>Item Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {
        food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
          {return(
            <>
              <div className="cart-items-title cart-items-item">
             <img src={item.image} alt="" />
             <p>{item.name}</p>
             <p>₹{item.price}</p>
             <p>{cartItems[item._id]}</p>
             <p>₹{item.price*cartItems[item._id]}</p>
             <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
            </div>
            <hr /></>
          
          )}
        })
        
      }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:40}</p>
            </div>
            <hr />
           {promo_code.includes(inputData) && getTotalCartAmount()>0? <div className="cart-total-details">
              <p>Discount</p>
              <p>₹{40}</p>
            </div>:<></>
            
            }
            {
              promo_code.includes(inputData) && getTotalCartAmount()>0? <hr/>:<></>

            }
            
            <div className="cart-total-details">
              <b>Total</b>
              <b> ₹ {promo_code.includes(inputData) && getTotalCartAmount()>0? getTotalCartAmount()===0 ?0:getTotalCartAmount():getTotalCartAmount()===0 ?0:getTotalCartAmount()+40}</b>
            </div>

          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code , Enter it here</p>
            <div className="cart-promocode-input">
              <input id='promocode' value={inputData} onChange={handleChange}  type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart