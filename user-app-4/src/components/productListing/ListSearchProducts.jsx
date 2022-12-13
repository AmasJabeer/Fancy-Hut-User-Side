import { useState, useEffect, useContext } from "react"
import {useNavigate, Link} from 'react-router-dom'
import { getProductsToLoop } from "../../utils/firebase/firebasefirestore.utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../product-loop/ProductLoop.styles.css';
import ProductLoop from '../product-loop/ProductLoop.component'
import {useParams} from 'react-router-dom'
import {firebaseContext} from '../../context/FirebaseContext'
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc  } from "firebase/firestore";
import {auth, db} from "../../utils/firebase/firebase.utils";
const ListProducts = () => {
    const {addToCart, myCartProducts,updateMyCart, user,handleDeletefromCart, products} = useContext(firebaseContext);

    const navigate = useNavigate()
    const {searchWord} = useParams();
    const [searchProducts, setSearchProducts] = useState([]);
    useEffect(() => {
        if(searchWord == 'all'){
            setSearchProducts(products)
        }else {
            let find = products.filter((item)=> item.data.ProductName.toUpperCase().indexOf(searchWord.toUpperCase()) > -1);
            console.log({find})
            setSearchProducts(products.filter((item)=> item.data.ProductName.indexOf(searchWord) > -1))
        }
    }, [searchWord]);

    // const [products, setProducts] = useState([]);
// console.log('products print', user);
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
    // async function getCategoryProducts() {
    //     const usersRef = collection(db, 'AddProducts');
    //     console.log(44232, categoryName)
    //     // const q = query(collection(db, "Users"), where("uid", "==", user.uid));
    //
    //     try {
    //         try{
    //             const q = query(collection(db, 'AddProducts'), where('Category', "==", categoryName))
    //             onSnapshot(q, (querySnapshot) => {
    //                 setProducts(querySnapshot.docs.map(doc => ({
    //                     id: doc.id,
    //                     data: doc.data()
    //                 })));
    //             })
    //
    //         }catch  (e) {
    //             console.debug('error white get my orders', e);
    //         }
    //         return true;
    //     }
    //     catch (e) {
    //         console.debug('error', e);
    //     }
    // }

    return (
        <div className='m-5'>
            <div className='row'>
                {searchProducts.length == 0 && <div><span style={{textAlign: 'center', color: 'black', fontSize: 30}}>No Products Found</span></div>}
                {searchProducts.map((product) => (
                    <div className="col-sm-12 col-lg-3 col-md-4" key={product.id}>
                        <ToastContainer />
                            <div className='card m-4' style={{textDecoration: 'none'}}>
                                <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>

                                <img className="card-img-top product-img" src={product.data.Image} alt={product.data.ProductName} />
                                </Link>

                        <div className="card-body">
                                    <h5 style={{textDecoration: 'none', color: 'black'}} className="card-title">{product.data.ProductName}</h5>
                                    <span style={{textDecoration: 'none'}} href="#" className="btn btn-outline-success" onClick={()=> handleAddProduct(product)}>ADD TO CART</span>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProducts
