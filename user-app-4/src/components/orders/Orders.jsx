import React, {useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {firebaseContext} from '../../context/FirebaseContext';

const Orders = () => {
    const {myCartProducts,updateMyCart, handleDeletefromCart, userDetail,createOrder,handleDeleteFromCart, user, myOrders, getMyOrders} = useContext(firebaseContext);

    return (
    <>
        <Outlet/>
        <div className="m-4">
            {/*<div className="alert alert-warning" role="alert">*/}
            {/*<i className="fa-solid fa-circle-exclamation me-3 ml-5"></i> BROWSE PRODUCTS No order has been made yet.*/}
            {/*</div>*/}
            <div className="table-responsive">
                <table className="table bordered striped">
                    <thead>
                    </thead>
                    <tbody>
                    <tr style={{backgroundColor: 'yellow'}}>

                        <th>order Id</th>
                        <th>Order Status</th>
                        <th>Order Total</th>
                    </tr>
                    {myOrders && myOrders.map((item, index)=> {
                       return <OrderListing order={item}/>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Orders


const ListingProducts = ({item,show, setShow, index}) => {
    return <>
        {show &&  <tr>

            {/*<td>{index+1}</td>*/}
            <td>{item.Price}</td>
            <td>{item.Quantity}</td>
            <td><img src={item.Image} className="img-thumbnail"  style={{width: '50px', height: '50px'}} alt="..."/></td>

        </tr>}
    </>
}

// <i className="fa-sharp fa-solid fa-chevron-down"></i>
const OrderListing = ({order}) => {
    const [show, setShow] = useState(false);
    return  <>
        <tr  onClick={()=> setShow(!show)} >

            <td>{order.id}</td>
            <td>{order.data.orderStatus}</td>
            <td>{order.data.order.reduce((acc, curr)=> {
                acc = acc + (curr.Price*curr.Quantity);
                return acc
            }, 300)}

                <a className="text-black ml-5"  style={{position: 'absolute', right: 100}}>
                    {!show &&  <i className="fa-sharp fa-solid fa-chevron-down"></i>}
                    {show && <i className="fa-sharp fa-solid fa-chevron-up"></i>}
                </a>
            </td>
        </tr>
        {show &&  <tr style={{color: 'white', backgroundColor: 'lightgreen'}}>

            {/*<td>No of Products</td>*/}
            <td>Unit Price</td>
            <td>Quantity</td>
            <td>Image</td>

        </tr>}
        {order.data.order.map((item, index)=> {
            return <>
            <ListingProducts item={item} show={show} setShow={setShow} index={index}/>
            </>
        })}

    </>
}
