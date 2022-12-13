import { useState, useEffect, useContext } from "react"
import {useNavigate, Link} from 'react-router-dom'
import { getProductsToLoop } from "../../utils/firebase/firebasefirestore.utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductLoop.styles.css';
import {firebaseContext} from '../../context/FirebaseContext'
const ProductLoop = () => {
const navigate = useNavigate()
const {products, addToCart, myCartProducts,updateMyCart, user,handleDeletefromCart, trendingProducts} = useContext(firebaseContext);
// console.log('products print', user);
  console.log({trendingProducts})

  const handleAddProduct = (product)=> {
  if(!user){
    navigate('/auth');
  }
  console.log('1')
  // Product: product.data,
  //     productId: product.id,
  //     BuyerId: user.uid,
  //     Quantity: product.data.qty \
  let temp = [...myCartProducts];
  console.log('temp products', temp);
  let count = temp.filter((item)=> item.data.ProductId == product.id);
  if(count.length >0){
    let tempIncreaseCount = temp.map((item)=> {
      if(item.data.ProductId == product.id){
        item.data.Quantity = product.data.StockQuantity> item.data.Quantity ? item.data.Quantity +1 : item.data.Quantity;
        return item;
      }
    });
    updateMyCart(tempIncreaseCount[0]).then((re)=> {
      toast.dark('Product added !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    console.log('2', tempIncreaseCount);
    console.log('2 item', tempIncreaseCount[0]);

  }else {

    product["Quantity"] = 1;
    addToCart(product).then((res)=> {
      toast.dark('Product added !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    console.log('3')

  }
}
  return (
    <>
      {products.length == 0 && <div><span style={{textAlign: 'center', color: 'black', fontSize: 30}}>No products found</span></div>}
    {products.map((product) => (
    <div className="col-sm-12 col-lg-3 col-md-4" key={product.id}>
      <ToastContainer />
      <div className='card m-4'>
        <Link to={`/product/${product.id}`}>
        <img className="card-img-top product-img" src={product.data.Image} alt={product.data.ProductName} />
        </Link>
        <div className="card-body">
            <h5 className="card-title">{product.data.ProductName}</h5>
            <span href="#" className="btn btn-outline-success" onClick={()=> handleAddProduct(product)}>ADD TO CART</span>
        </div>
      </div>
    </div>
    ))}
    </>
  )
}

export default ProductLoop
