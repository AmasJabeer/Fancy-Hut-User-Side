import React, { useMemo, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitForm = () => {
    // const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);
        if(payload.error){
            setErrorMessage(payload.error.message)
        }
        if(payload.paymentMethod){
            setErrorMessage('');
            setSuccessMessage(true)

        }

    };
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const stripe = loadStripe(
        "pk_test_51LaaebE1y6QIfNeVvqujr2elcO1UYRMW3DhHwN89YV7MXtH1uNUKLf2l16DjGSu09s2ujcmB3dTdQEIOTaMITM7y00AWQ9TJVI"
    );

    const payMoney = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setPaymentLoading(true);
        const paymentResult = await stripe.confirmCardPayment('cus_MK8u4suL3he1m8', {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Faruq Yusuff",
                },
            },
        });
        setPaymentLoading(false);
        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Success!");
            }
        }
    };

    return (
        <div style={{width: '500px', height: '400px', marginTop: '20px', marginBottom: '20px', paddingTop:'10px', marginLeft: '20px'}} className={'card'}>
        <form onSubmit={payMoney} >
            <div>
            <label style={{minWidth: '250px'}}>
                Card number
                <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            </div>
        <div>
            <label>
                Expiration date
                <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
        </div>
        <div>
            <label style={{minWidth: '70px'}}>
                CVC
                <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
        </div>
            <div>
                <span style={{color: 'red'}}>{errorMessage && errorMessage}</span>
                <span style={{color: 'green'}}>{successMessage && 'Payment Success'}</span>
            </div>
        <div>
                {/*<button type="submit" disabled={!stripe} style={{width: '100px'}}>*/}
                {/*    Pay*/}
                {/*</button>*/}
            <button
                className="pay-button"
                disabled={isPaymentLoading}
                type='submit'
            >
                {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
        </div>
        </form>
        </div>
    );
};

export default SplitForm;
