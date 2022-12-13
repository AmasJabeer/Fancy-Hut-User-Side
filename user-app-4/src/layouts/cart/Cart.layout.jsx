import {useContext, useState, useEffect} from 'react';
import {firebaseContext} from '../../context/FirebaseContext'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Customer, CurrencyType, PayhereCheckout, CheckoutParams, Payhere, AccountCategory} from 'payhere-js-sdk'

const Cart = () =>{
    // Payhere.init("eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo1MDUsIm1vZGUiOiJsaXZlIn0.K5gySA9c2oXXLgPYK3ttND-zcskRb0qU6Pb3_N1cQlkRUoX2gNWMCyCawPyfNF5wtIy5Ui596dHt9EV4OXxxaA",AccountCategory.SANDBOX)
    const navigate = useNavigate();
    const {myCartProducts,updateMyCart, handleDeletefromCart, userDetail,createOrder,handleDeleteFromCart, user,updateProductCount} = useContext(firebaseContext);
    const [myCart, setMyCart] = useState(myCartProducts);
    const [removeProducts, setRemoveProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    useEffect(() => {
       setMyCart(myCartProducts)
    }, [myCartProducts]);
    useEffect(() => {
       let total = myCart.reduce((acc, curr)=> {
           let temp = Number(curr.data.Quantity) * Number(curr.data.Product.Price);
           acc = acc + temp;
           return acc
       }, 0);
       setSubTotal(total);
    }, [myCart]);
    const handleRemoveItem =(id)=> {
        let temp = [...myCart];
        let filtered = temp.filter((item)=> item.id !== id);
        setRemoveProducts(pre=> [...pre, id])
        setMyCart(filtered);
    }
    const hanldeCountIncrease =(id)=> {
        let temp = [...myCart];
        let filtered = temp.map((item)=> {
            if(item.id == id){
                item.data.Quantity = item.data.Product.StockQuantity > item.data.Quantity ? item.data.Quantity +1 : item.data.Quantity;
            }
            return item;
        });
        setMyCart(filtered);
    }
    const hanldeCountDecrease =(id)=> {
        let temp = [...myCart];
        let filtered = temp.map((item)=> {
            if(item.id == id){
                item.data.Quantity = item.data.Quantity > 1 ? item.data.Quantity -1 : 1;
            }
            return item;
        });
        setMyCart(filtered);
    }
    const handleUpdateCart =()=> {
        if(removeProducts.length > 0){
            for(let item of removeProducts){
                handleDeletefromCart(item)
            }
        }
        if(myCart.length >0){
            for(let item of myCart){
                updateMyCart(item);
            }
        }
    }
    const handleCheckOut = ()=>{
        console.log({userDetail})
      if(!userDetail){
          navigate('/dashboard/address-modify', { replace: true })
      }else {
          let temp = myCart.map((item)=> {
              return {ProductID: item.data.ProductId, ProductName: item.data.Product.ProductName, Quantity: item.data.Quantity, Price: item.data.Product.Price, Image: item.data.Product.Image}
          });
          createOrder(temp).then((res)=> {
              navigate('/payPalButton', { state: { amount: `${subTotal + 300}` } });
              console.log('create order response', res)
              toast.dark('Order created Succesfully!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
          });
          if(myCartProducts.length > 0){
              for(let item of myCartProducts){
                    updateProductCount(item.data.ProductId, item.data.Quantity)
                  handleDeletefromCart(item.id)
              }
          }
      }
    }
    const payPayment = ()=> {

    }

    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg)
    }

    const  checkout=()=> {
        navigate('/payPalButton', { state: { orderId: 'pirstna' } });
        // const customer = new Customer({
        //     first_name: "Pavindu",
        //     last_name: "Lakshan",
        //     phone: "+94771234567",
        //     email: "plumberhl@gmail.com",
        //     address: "No. 50, Highlevel Road",
        //     city: "Panadura",
        //     country: "Sri Lanka",
        // })
        //
        // const checkoutData = new CheckoutParams({
        //     returnUrl: 'http://localhost:3000/return',
        //     cancelUrl: 'http://localhost:3000/cancel',
        //     notifyUrl: 'http://localhost:8080/notify',
        //     order_id: '112233',
        //     itemTitle: 'Demo Item',
        //     currency: CurrencyType.LKR,
        //     amount: 100
        // })
        //
        // const checkout = new PayhereCheckout(customer,checkoutData,onPayhereCheckoutError)
        // checkout.start()
    }
    return (
    <div className="m-3 row">
        <ToastContainer />
        <div className="col-lg-8 col-sm-12">
        <div className='mb-3 row mt-2'>
                <h3>Cart Items</h3>
        </div>
            <div className="table-responsive">
            <table className="table bordered striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                {myCart && myCart.map((item)=> {
                    console.log('my cart items', item)
                    return (<tr>
                    <td><button type="button" className="btn " onClick={()=> handleRemoveItem(item.id)}><i className="fa-solid fa-xmark"></i></button></td>
                    <td><img src={item.data.Product.Image} className="img-thumbnail"  style={{width: '50px', height: '50px'}} alt="..."/></td>
                    <td>{item.data.Product.ProductName}</td>
                    <td>{item.data.Product.Price}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={()=> hanldeCountDecrease(item.id)}>-</button>
                    <button type="button" className="btn btn-success">{item.data.Quantity}</button>
                    <button type="button" className="btn btn-success" onClick={()=> hanldeCountIncrease(item.id)}>+</button>
                    </div>
                    </td>
                    <td>{Number(item.data.Product.Price)*Number(item.data.Quantity)}</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
        <div className="row justify-content-center">
            <button type="button" className="btn btn-success w-50" onClick={()=> handleUpdateCart()}>Update Cart</button>
        </div>
        </div>
        {myCart.length > 0 &&   (<div className="col-lg-4 col-sm-12">
            <div className="card m-3">
                <div className="card-body text-start m-2">
                    <div className="row">
                        <h5 className="card-title">Cart Totals</h5>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h6 className="card-subtitle mb-2 mt-2 text-start">Subtotal</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="card-subtitle mb-2 mt-2 text-end">රු {subTotal}</h6>
                        </div>
                        <hr />
                        <div className="col-6">
                            <h6 className="card-subtitle mb-2 mt-2 text-start">Shipping</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="card-subtitle mb-2 mt-2 text-end">රු300.00</h6>
                        </div>
                        <p className="card-subtitle mb-2 mt-2 text-end">Deliver to my shipping address</p>
                        <hr />
                        <div className="col-6">
                            <h4 className="card-subtitle mb-2 mt-2 text-start">Total</h4>
                        </div>
                        <div className="col-6">
                            <h4 className="card-subtitle mb-2 mt-2 text-end">රු {subTotal + 300}</h4>
                        </div>
                        <button type="button" className="btn btn-success mt-4 mb-2" onClick={()=> handleCheckOut()}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>)}
    </div>
  )
}

export default Cart
