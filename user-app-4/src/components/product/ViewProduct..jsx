import { useState, useEffect, useContext } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { getProductsToLoop } from "../../utils/firebase/firebasefirestore.utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../product-loop/ProductLoop.styles.css';
import {firebaseContext} from '../../context/FirebaseContext'
const ViewProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {products, addToCart, myCartProducts,addRequestForVideo, updateMyCart, user,handleDeletefromCart, getProductId, product} = useContext(firebaseContext);
    useEffect(() => {
        if(id){
        getProductId(id)
        }
    }, [id]);
    console.log({product})
    const handleAddProduct = (prd)=> {
        console.log('prd',prd)
        if(!user){
            navigate('/auth');
        }
        console.log('1')
        let temp = [...myCartProducts];
        console.log('temp products', temp);
        let count = temp.filter((item)=> item.data.ProductId == prd.id);
        if(count.length >0){
            let tempIncreaseCount = temp.map((item)=> {
                if(item.data.ProductId == prd.id){
                    item.data.Quantity = prd.data.StockQuantity> item.data.Quantity ? item.data.Quantity +1 : item.data.Quantity;
                    return item;
                }
            });
            updateMyCart(tempIncreaseCount[0]).then((re)=> {
                toast.dark('Product added to Cart !', {
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

            prd["Quantity"] = 1;
            addToCart(prd).then((res)=> {
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
    let videoLInk = product && product.data.Video && product.data.Video.split('=')[0];
    console.log({user})
    const makeRequestForVieo=()=> {
        let temp = {
            userId: user.uid,
            userName: user.displayName ? user.displayName : null,
            userEmail: user.email? user.email : null,
            productId: product.id,
            productName: product.data.ProductName,
            productImage: product.data.Image,
            requestMake: true,
        }
        addRequestForVideo(temp).then((res)=> {
            console.log({res})
            toast.dark('Request Sent !', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    return (
        <>
            {product &&    <div className="col-sm-12 row pt-4 mb-4" key={product.id}>
                    <ToastContainer />
                    <div className='card col-md-4'>
                        <img className="card-img-top product-img" src={product.data.Image} alt={product.data.ProductName} />
                        {/*<div className="card-body">*/}
                        {/*    <h5 className="card-title">{product.data.ProductName}</h5>*/}
                        {/*    <span href="#" className="btn btn-outline-success" onClick={()=> handleAddProduct(product)}>ADD TO CART</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className='card col-md-8'>
                        <div className="card">
                            <div className="card-header">
                                Product Detail
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.data.ProductName}</h5>
                                <h5 className="card-title">Rs. {product.data.Price}</h5>
                                <p className="card-text">{product.data.Description}</p>
                                <p className="card-text" style={{color: 'green', fontSize: 14}}>In Stock ({product.data.StockQuantity})</p>
                                <a  onClick={()=> handleAddProduct(product)} className="btn btn-primary">Add to Cart</a>
                            </div>
                        </div>
                        {product.data.Video &&   <div className="card">
                            <div className="card-header">
                                You tube
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.data.Video}</h5>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe src={product.data.Video} title="YouTube video" allowFullScreen></iframe>

                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className='card col-md-4'>
                        {product.data.Video == undefined &&  (<a  onClick={()=> makeRequestForVieo() }className="btn btn-success">Make request for video</a>)}
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default ViewProduct
