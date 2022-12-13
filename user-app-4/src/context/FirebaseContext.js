import {createContext, useState, useEffect} from "react";
import 'firebase/compat/firestore';
import {
    onAuthStateChanged
} from "firebase/auth";
import app from 'firebase/compat/app'
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc,getDoc,setDoc  } from "firebase/firestore";
import {auth, db} from "../utils/firebase/firebase.utils";
export const firebaseContext = createContext();
export function FirebaseContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [userDetail, setUserDetail] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [myCartProducts, setMyCartProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [product, setProduct] = useState(null);
    const [orders, setOrders] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    useEffect(() => {
     getAllProducts();
        getAllCategory();
        getAllBlogs();
        getAllOrders();
    }, []);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        if(user){
            getUserDetailById(user.uid);
            getMyOrders();
        }
    }, [user]);
    useEffect(() => {
        console.log('4324324 called')
    if(products && products.length > 0){
        let temp = products.sort((a, b) => b.data.SoldProductCount - a.data.SoldProductCount);

        console.log({temp});
        setTrendingProducts(temp.slice(0,4))
    }
    }, [products]);


    useEffect(() => {
       if(user){
           getMyCartProducts()
       }
    }, [user]);

    async function getAllOrders() {
        const ordersRef = collection(db, 'Order');

        try {
            try{
                const q = query(collection(db, 'Order'))
                onSnapshot(q, (querySnapshot) => {
                    setOrders(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
            }catch  (e) {
                console.debug('error white add product', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function addProduct(name, price, category, stock, description,image) {
        const productsRef = collection(db, 'AddProducts');

        try {
                try{
                    await addDoc(collection(db, 'AddProducts'), {
                        ProductName: name,
                        Price: price,
                        Category: category,
                        StockQuantity: stock,
                        Description: description,
                        Image: image
                    })
                }catch  (e) {
                    console.debug('error white add product', e);
                }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllProducts() {
        const productsRef = collection(db, 'AddProducts');

        try {
                try{
                    const q = query(collection(db, 'AddProducts'))
                    onSnapshot(q, (querySnapshot) => {
                        setProducts(querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })
                }catch  (e) {
                    console.debug('error white add product', e);
                }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function addBlock(title, description,image) {
        const blockRef = collection(db, 'Blog');

        try {
            try{
                await addDoc(collection(db, 'Blog'), {
                    BlockTitle: title,
                    Description: description,
                    Image: image,
                    Approved: false,
                    Author: user.displayName? user.displayName : user.email,
                    AuthorId: user.uid
                })
            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllCategory() {
        const blockRef = collection(db, 'Category');

        try {
            try{
                const q = query(collection(db, 'Category'))
                onSnapshot(q, (querySnapshot) => {
                    setCategories(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllBlogs() {
        const blockRef = collection(db, 'Blog');
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'Blog'), where('Approved', "==", true))
                onSnapshot(q, (querySnapshot) => {
                    setBlogs(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })

            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getProductId(id) {
        console.log('selected product', id)
        const blockRef = collection(db, 'AddProducts');

        try {
            try{
                const unsub = onSnapshot(doc(db, "AddProducts", id), (doc) => {
                    let temp = {
                        id: doc.id,
                        data: doc.data()
                    }
                    setProduct(temp);
                });

            }catch  (e) {
                console.debug('error while get product by id', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    // async function getAllsearchProducts(word) {
    //     try {
    //         try{
    //             const productRef = doc(db, "AddProducts");
    //             const docSnap = await getDocs(productRef).where('ProductName', '>=' ,  word );
    //
    //             setSearchProduct(docSnap.docs.map((doc)=> {id: doc.id, data: doc.data()}));
    //         }catch  (e) {
    //             console.debug('error while get search products by name', e);
    //         }
    //         return true;
    //     }
    //     catch (e) {
    //         console.debug('error', e);
    //     }
    // }
    async function getMyCartProducts() {
        const blockRef = collection(db, 'Blog');
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'Cart'), where('BuyerId', "==", user.uid))
                onSnapshot(q, (querySnapshot) => {
                    setMyCartProducts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })

            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }


    async function addToCart(product) {
        const cartRef = collection(db, 'Cart');

        try {
            try{
           const res =  await addDoc(collection(db, 'Cart'), {
                    Product: product.data,
                    ProductId: product.id,
                    BuyerId: user.uid,
                    Quantity: product.Quantity,
                    CreatedAt: new Date(),
                });
           console.log('product add success', res);
            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    const updateMyCart = async (product) => {
        const cartRef = doc(db, 'Cart', product.id)
        try{
         const res = await updateDoc(cartRef, {
                Quantity: product.data.Quantity,
                CreatedAt: new Date()
            });
            console.log('product update to cart success', res);
        } catch (err) {
            alert(err)
        }
    }
    const handleDeletefromCart = async (id) => {
        const taskDocRef = doc(db, 'Cart', id)
        try{
            await deleteDoc(taskDocRef)
            console.log('deleted successfully')
        } catch (err) {
            alert(err)
        }
    }


    async function createOrder(order) {
        // orderstatus = created,order accepted, order canceled, deliverystart, ontheway, delivered, deliveryfail, completed, ,
        // order created, order accepted, order cancelled, order pick up, ontheway, order completed, order canceled,
        let numOfOrders = orders.length;

        const orderRef = collection(db, 'Order');
        console.log("create order called outside")


        try {
            try{
                //
                // await setDoc(doc(db, "users", sale_id), {
                //     id: sale_id,
                //     username: user,
                //     likePost: userLikes
                // });
                // const res =  await addDoc(collection(db, 'Order'), {
                //     order: order,
                //     BuyerId: user.uid,
                //     BuyerName: user.displayName? user.displayName : user.email,
                //     CreatedAt: new Date(),
                //     DeliveryAddress: userDetail,
                //     orderStatus: 'CREATED'
                // });
                console.log("create order called inside");
                // `ORDER/${Number(numOfOrders)+ 1}`
                let unic_id = `ORDER${orders.length? orders.length : 0}`;
                const docRef = doc(db, "Order",  unic_id);
                const res = setDoc(docRef, {
                    order: order,
                    BuyerId: user.uid,
                    BuyerName: user.displayName? user.displayName : user.email,
                    CreatedAt: new Date(),
                    DeliveryAddress: userDetail,
                    orderStatus: 'CREATED'
                })
                // const res  =  await setDoc(doc(db, "Order", `ORDER/${Number(numOfOrders)+ 1}`), {
                //     order: order,
                //     BuyerId: user.uid,
                //     BuyerName: user.displayName? user.displayName : user.email,
                //     CreatedAt: new Date(),
                //     DeliveryAddress: userDetail,
                //     orderStatus: 'CREATED'
                // });
                console.log('order created response data', res)
                return res;
            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function getUserDetailById(id) {
        const usersRef = collection(db, 'Users');
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'Users'), where('uid', "==", id))
                onSnapshot(q, (querySnapshot) => {
                  let temp = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }));
                  setUserDetail(temp[0].data.Details)
                })

            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    const updateUserDetails = async (detail) => {
        const usersRef = doc(db, 'Users', user.uid)
        try{
            const res = await updateDoc(usersRef, {
                Details: detail,
            });
            console.log('user details update success', res);
        } catch (err) {
            alert(err)
        }
    }

    const handleDeleteFromCart = async (id) => {
        const cartRef = doc(db, 'Cart', id)
        try{
            await deleteDoc(cartRef)
            console.log('deleted successfully')
        } catch (err) {
            alert(err)
        }
    }

    async function getMyOrders() {
        const usersRef = collection(db, 'Order');
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'Order'), where('BuyerId', "==", user.uid))
                onSnapshot(q, (querySnapshot) => {
                    setMyOrders(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                })

            }catch  (e) {
                console.debug('error white get my orders', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function addRequestForVideo(request) {
        console.log('recieved data', request)
        const productsRef = collection(db, 'videoRequest');

        try {
            try{
                await addDoc(collection(db, 'videoRequest'), request)
            }catch  (e) {
                console.debug('error white make request', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function getRequestsForVideo() {
        const usersRef = collection(db, 'Order');
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'videoRequest'), where('requestMake', "==", true))
                onSnapshot(q, (querySnapshot) => {
                    setMyOrders(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                })

            }catch  (e) {
                console.debug('error white get my orders', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    const handleUpdateOrderStatus = async (status, orderId) => {
        const orderRef = doc(db, 'Order', orderId)
        try{
            const res = await updateDoc(orderRef, {
                orderStatus: status,
            });
            console.log('order status update success', res);
        } catch (err) {
            alert(err)
        }
    }
    async function getProductById(id) {
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));
        try {
            const productRef = doc(db, "AddProducts", id);
            const docSnap = await getDoc(productRef);
            const product = {
                data:  docSnap.data(),
                id: docSnap.id
            };
            return product
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    const updateProductCount = async (id, count) => {
        let temps = await getProductById(id);
        //SoldProductsCount :
        console.log(1111, temps)

        const productRef = doc(db, 'AddProducts', id)
        try{
            await updateDoc(productRef, {
                StockQuantity: (Number(temps.data.StockQuantity) - Number(count)),
                SoldProductCount : (Number(temps.data.SoldProductCount) + Number(count))
            })
        } catch (err) {
            alert(err)
        }
    }
    return (
        <firebaseContext.Provider
            value={{
                addProduct,
                addBlock,
                products,
                getAllProducts,
                categories,
                getAllCategory,
                getAllBlogs,
                blogs,
                addToCart,
                myCartProducts,
                updateMyCart,
                user,
                handleDeletefromCart,
                updateUserDetails,
                userDetail,
                createOrder,
                handleDeleteFromCart,
                myOrders,
                getMyOrders,
                getProductId,
                product,
                addRequestForVideo,
                handleUpdateOrderStatus,
                updateProductCount,
                trendingProducts
                }}
        >
            {children}
        </firebaseContext.Provider>
    );
}

// export function useUserAuth() {
//     return useContext(userAuthContext);
// }

