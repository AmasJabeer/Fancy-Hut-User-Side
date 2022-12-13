import {useContext, useState, useEffect} from 'react';
import {firebaseContext} from '../../context/FirebaseContext'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () =>{
    const navigate = useNavigate();
    const {myCartProducts,updateMyCart, handleDeletefromCart, userDetail,createOrder,handleDeleteFromCart, user, myOrders, getMyOrders} = useContext(firebaseContext);
    return (
        <div className="m-3 row">
            <ToastContainer />
            <div className="col-lg-8 col-sm-12">
                <div className='mb-3 row mt-2'>
                    <h3>My Orders</h3>
                </div>
                <div className="table-responsive">
                    <table className="table bordered striped">
                        <thead>
                        <tr>
                            <th></th>
                            <th>order Id</th>
                            <th>Order Status</th>
                            <th>Ordered Date CreatedAt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myOrders && myOrders.map((item)=> {
                            console.log('my cart items', item)
                            return ( <tr>
                                <th></th>
                                <th>order Id</th>
                                <th>Order Status</th>
                                <th>Ordered Date CreatedAt</th>
                                 </tr>
                            //     <tr>
                            //         <td>{}</td>
                            //     <td><button type="button" className="btn " onClick={()=> handleRemoveItem(item.id)}><i className="fa-solid fa-xmark"></i></button></td>
                            //     <td><img src={item.data.Product.Image} className="img-thumbnail"  style={{width: '50px', height: '50px'}} alt="..."/></td>
                            //     <td>{item.data.Product.ProductName}</td>
                            //     <td>{item.data.Product.Price}</td>
                            //     <td>
                            //         <div className="btn-group" role="group" aria-label="Basic example">
                            //             <button type="button" className="btn btn-success" onClick={()=> hanldeCountDecrease(item.id)}>-</button>
                            //             <button type="button" className="btn btn-success">{item.data.Quantity}</button>
                            //             <button type="button" className="btn btn-success" onClick={()=> hanldeCountIncrease(item.id)}>+</button>
                            //         </div>
                            //     </td>
                            //     <td>{Number(item.data.Product.Price)*Number(item.data.Quantity)}</td>
                            // </tr>
                        )
                        })}
                        </tbody>
                    </table>
                </div>
                {/*<div className="row justify-content-center">*/}
                {/*    <button type="button" className="btn btn-success w-50" onClick={()=> handleUpdateCart()}>Update Cart</button>*/}
                {/*</div>*/}
            </div>
            {/*{myCart.length > 0 &&   (<div className="col-lg-4 col-sm-12">*/}
            {/*    <div className="card m-3">*/}
            {/*        <div className="card-body text-start m-2">*/}
            {/*            <div className="row">*/}
            {/*                <h5 className="card-title">Cart Totals</h5>*/}
            {/*            </div>*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-6">*/}
            {/*                    <h6 className="card-subtitle mb-2 mt-2 text-start">Subtotal</h6>*/}
            {/*                </div>*/}
            {/*                <div className="col-6">*/}
            {/*                    <h6 className="card-subtitle mb-2 mt-2 text-end">රු {subTotal}</h6>*/}
            {/*                </div>*/}
            {/*                <hr />*/}
            {/*                <div className="col-6">*/}
            {/*                    <h6 className="card-subtitle mb-2 mt-2 text-start">Shipping</h6>*/}
            {/*                </div>*/}
            {/*                <div className="col-6">*/}
            {/*                    <h6 className="card-subtitle mb-2 mt-2 text-end">රු300.00</h6>*/}
            {/*                </div>*/}
            {/*                <p className="card-subtitle mb-2 mt-2 text-end">Deliver to my shipping address</p>*/}
            {/*                <hr />*/}
            {/*                <div className="col-6">*/}
            {/*                    <h4 className="card-subtitle mb-2 mt-2 text-start">Total</h4>*/}
            {/*                </div>*/}
            {/*                <div className="col-6">*/}
            {/*                    <h4 className="card-subtitle mb-2 mt-2 text-end">රු {subTotal + 300}</h4>*/}
            {/*                </div>*/}
            {/*                <button type="button" className="btn btn-success mt-4 mb-2" onClick={()=> handleCheckOut()}>PROCEED TO CHECKOUT</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>)}*/}
        </div>
    )
}

export default Cart
