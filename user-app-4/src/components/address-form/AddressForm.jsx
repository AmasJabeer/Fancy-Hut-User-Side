import { React, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {firebaseContext} from '../../context/FirebaseContext'
const defaultFormState = {
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email:"",
  };

const AddressForm = () => {
    const {userDetail, updateUserDetails} = useContext(firebaseContext);

    const [formState, setFormState] = useState(defaultFormState);
  const { firstName, lastName, country,  address, city, postalCode, phone, email } = formState;

  const navigate = useNavigate();

  const resetForm = () => {
    setFormState(defaultFormState);
  };

  const handleSubmit = (event) => {
    const handler = async () => {
      event.preventDefault();
      // if (firstName == "" || lastName == "" || country == "" || address == "" || city == "" || postalCode == "" || phone == "" || email=="") {
      if (firstName == "" || lastName == "" || country == "" || address == "" || city == "" ||  phone == "") {
        alert("no empty values allowed");
        return;
      }
      // if (email == "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/") {
      //   alert("email format is not correct");
      //   return;
      // }
      try {
          let detail = {
              firstName,
              lastName,
              country,
              address,
              city,
              postalCode,
              phone,
              email
          }
          updateUserDetails(detail).then(()=> {
              // navigate('/dashboard', { replace: true })
              navigate(-1)
          });
          console.log('use detail', detail)
        // const response = await createUserFromEmailAndPassword(email, password);
        // await createUserFromAuth(response.user, { displayName });
        // setCurrentUser(response.user);
        // resetForm();
        // navigate("/dashboard");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use");
        }
        console.error("error during user creation", error);
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
    <>
    <Outlet/>
    <form className='mb-5 p-5' onSubmit={handleSubmit}>
        <div className='mb-5'>
            <h3>ADD ADDRESS</h3>
        </div>
        <div className="mb-3">
            <label for="first_name" className="form-label">First Name</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="firstName"
            value={firstName}/>
        </div>
        <div className="mb-3">
            <label for="last_name" className="form-label">Last Name</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="lastName"
            value={lastName}/>
        </div>
        <div className="mb-3">
            <label for="country" className="form-label">country</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="country"
            value={country}/>
        </div>
        <div className="mb-3">
            <label for="address" className="form-label">Address</label>
            <textarea rows="3"className="form-control"
            onChange={handleChange}
            name="address"
            value={address}>
            </textarea>
        </div>
        <div className="mb-3">
            <label for="city" className="form-label">Town / City</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="city"
            value={city}/>
        </div>
        <div className="mb-3">
            <label for="postal_code" className="form-label">Postcode / ZIP</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="postalCode"
            value={postalCode}/>
        </div>
        <div className="mb-3">
            <label for="phone" className="form-label">Phone</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="phone"
            value={phone}/>
        </div>
        <div className="mb-3">
            <label for="email" className="form-label">Email Address</label>
            <input type="text" className="form-control"
            onChange={handleChange}
            name="email"
            value={email}/>
        </div>
        <button type="submit" className="btn btn-success mt-4 w-100">Save Address</button>
    </form>
    </>
  )
}

export default AddressForm
