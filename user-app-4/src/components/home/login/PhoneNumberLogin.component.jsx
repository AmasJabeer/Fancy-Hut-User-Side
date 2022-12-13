import { useState, React } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {useNavigate} from 'react-router-dom';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

const  PhoneNumberLogin=()=> {
    const auth = getAuth();
    // const appVerifier = window.recaptchaVerifier
    const appVerifier = window.recaptchaVerifier;


    const [phoneNumber, setPhoneNumber] = useState(null);
    const handlePhoneNumber =(e)=> {
        setPhoneNumber(e);
    }

    const handleLogin = ()=> {

    }

  const   handleSignUp = () => {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
              console.log({confirmationResult})
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              // ...
          }).catch((error) => {
              console.log({error})
          // Error; SMS not sent
          // ...
      });
    };
  const   onVerifyCodeSubmit = event => {
      event.preventDefault();
      const verificationId = this.state.verifyNumber;
      window.confirmationResult
          .confirm(verificationId)
          .then(function (result) {
              // User signed in successfully.
              var user = result.user;
              user.getIdToken().then(idToken => {
                  console.log(idToken);
              });
          })
          .catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error("Error while checking the verification code", error);
              window.alert(
                  "Error while checking the verification code:\n\n" +
                  error.code +
                  "\n\n" +
                  error.message
              );
          });
  }
    return   <div className=" btn-success mt-4 w-100 px-4 py-4">
        <form  className="user-info-form">
            <div>
                <label htmlFor="phone-input">Phone Number</label>
                        <PhoneInput
                            // country='LK'
                            countries={['LK']}
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            defaultCountry="LK"
                            id="phone-input"
                        />
            </div>
            <button
                type="button"
                className="btn btn-primary mt-4 w-100"
                onClick={()=> handleSignUp()}
            >
                Login
            </button>
        </form>
    </div>
}

export  default PhoneNumberLogin
