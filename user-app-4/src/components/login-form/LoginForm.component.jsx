import { useState, React, useContext } from "react";
import {
  signInWithGooglePopup,
  signInUserFromEmailAndPassword,
  createUserFromAuth,
} from "../../utils/firebase/firebaseauth.utils";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {useNavigate} from 'react-router-dom';
// import { useUserAuth } from "../context/UserAuthContext";
import { useUserAuth } from "../../context/UserAuthContext";
import PhoneNumberLogin from '../../components/home/login/PhoneNumberLogin.component'
import {firebaseContext} from '../../context/FirebaseContext';
const defaultFormState = {
  email: "",
  password: "",
};

const LoginForm = ({handleShowLogin}) => {
  const {user} = useContext(firebaseContext);
  const navigate = useNavigate();
  if(user){
    navigate('/');
  }
  const [formState, setFormState] = useState(defaultFormState);
  const { email, password } = formState;
  const { loginWithEmailAndPassword } = useUserAuth();
  // const [showForm, setShowForm] = useState({email: false, phone: false});
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const resetForm = () => {
    setFormState(defaultFormState);
  };


  const signInWithGooglePU = async () => {
    const response = await signInWithGooglePopup();
    console.log({response})
    if (response) {
      await createUserFromAuth(response.user);
      if (response.user.email==="admin@fancyhut.com") {
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }
    }
  };

  const handleSubmit = (event) => {
    const handler = async () => {
      event.preventDefault();
      if (email === "" || password === "" ) {
        alert("no empty values allowed don't match");
        return;
      }
      try {
        const { user } = await loginWithEmailAndPassword(email, password);
        // setCurrentUser(user);
        console.log({user})
        resetForm();
        if (user.email==="admin@fancyhut.com") {
          navigate("/admin");
        }else{
          navigate("/dashboard");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
        }
        console.error("error during user login", error);
      }
    };

    handler().catch((error) => {
      console.error(error);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  return (
      <div>
          {/*{showForm.phone && <PhoneNumberLogin/>}*/}
    <form className="mb-5" onSubmit={handleSubmit}>
      <div className="mb-5">
        <h3>LOG IN</h3>
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">
          Username or email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
      </div>
     <button type="submit" className="btn btn-success mt-4 w-100">
       Login
      </button>
      <button
        type="button"
        className="btn btn-primary mt-4 w-100"
        onClick={signInWithGooglePU}
      >
        Sign In With Google
      </button>

      <div onClick={handleShowLogin} className={"text-end pt-2 blue pr-2 mouseHover"}>
        <span>Create account</span>
      </div>
      {/*<button*/}
      {/*    type="button"*/}
      {/*    className="btn btn-success  mt-4 w-100"*/}
      {/*    onClick={()=> setShowForm({email:false, phone: true})}*/}
      {/*>*/}
      {/*  Sign In Phone Number*/}
      {/*</button>*/}
      {/*<button*/}
      {/*    type="button"*/}
      {/*    className="btn btn-primary mt-4 w-100"*/}
      {/*   */}
      {/*>*/}
      {/*  Sign In With Email and Password*/}
      {/*</button>*/}
    </form>
      </div>
  );
};

export default LoginForm;
//
// import { useForm, Controller } from "react-hook-form";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
