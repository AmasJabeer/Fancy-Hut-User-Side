import {useContext, useNavigation, useState} from 'react'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js";
import { PayPalButtonsComponentProps } from "@paypal/paypal-js";
import {useLocation, Link, useParams} from 'react-router-dom'
// import {firebaseContext} from '../../context/FirebaseContext'

const paypalScriptOptions: PayPalScriptOptions = {
    "client-id":
        "AWrGZ0ovSAqPu_HXcAPL2BKtQ0IoZ_dsKEsSO7HKCZY0rXNHLODfXTwxBHVvOjY6PYUTOfACtWRkdO9t",
    currency: "USD"
};
const  Button=({onSuccess})=> {

    // const {myCartProducts,updateMyCart, handleDeletefromCart, userDetail,createOrder,handleDeleteFromCart, user,handleUpdateOrderStatus} = useContext(firebaseContext);
    // const navigation = useNavigation();
    const location = useLocation();
    // const {amount} = useParams()
    console.log(location.state);


    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: "vertical" },
        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: Number(location.state.amount/350).toFixed(2)
        }
                    }
                ]
            });
        },
        onApprove(data, actions) {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return actions.order.capture({}).then((details) => {
                onSuccess();
                <Link to={'/'}><span style={{color: 'green', fontSize: 18}}>Success</span></Link>
                // alert(
                //     "Transaction completed by" +
                //     (details?.payer.name.given_name ?? "No details")
                // );
                //
                // alert("Data details: " + JSON.stringify(data, null, 2));
            });
        }
    };
    return (
        <>
            {isPending ? <h2>Load Smart Payment Button...</h2> : null}
            <PayPalButtons {...paypalbuttonTransactionProps} />
        </>
    );
}
export default function App() {
    // const navigation = useNavigation();
    const {amount} = useParams()
    const [paid, setPaid] = useState(false);
    const paidAfter = ()=> {
        setPaid(true)
    }
    const [clicked, setClicked] = useState(false);
    return (
        <div className="App" style={{paddingTop: 20, paddingBottom: 20}}>
            {!clicked && <>
                <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center',flexDirection: 'column', marginLeft: '10%' }}>
                    <div onClick={()=> {
                    setPaid(true);
                    setClicked(true)}
                    } style={{textDecoration: 'none', padding: 10, borderWidth: '2px', borderColor: 'black', borderRadius: '8px', backgroundColor: 'red', width: '40%'}}><span style={{padding: 10, alignText: 'center', textDecoration: 'none',color: 'white', borderWidth: '2px', borderColor: 'black', borderRadius: '15px'}}>Cash on delivery</span></div>
                    <div onClick={()=> setClicked(true)} style={{textDecoration: 'none', padding: 10, borderWidth: '2px', borderColor: 'white', borderRadius: '8px', backgroundColor: 'blue', marginTop: 20, width: '40%'}}><span style={{padding: 10, alignText: 'center', textDecoration: 'none',color: 'white', borderWidth: '2px', borderColor: 'black', borderRadius: '15px'}}>Online Payment</span></div>
                </div></>}
            {/*<h1>Hello PayPal</h1>*/}
            {!paid && clicked && <PayPalScriptProvider options={paypalScriptOptions}>
                <Button onSuccess={paidAfter}/>
            </PayPalScriptProvider>}
            {paid && <Link to={'/'} style={{textDecoration: 'none'}}>
                <img className="card-img-top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzn7NLgJZDoFAFvN7L3eI5BTwsH5Cpr3Xk7A&usqp=CAU'  style={{width: 200, height: 150}} />
                <span style={{textDecoration: 'none', color: 'green', fontSize: '20px'}}>Order Placed Successfully</span>
            </Link>}
        </div>
    );
}
