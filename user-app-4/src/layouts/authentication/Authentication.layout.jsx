import React, { Fragment, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import LoginForm from "../../components/login-form/LoginForm.component";
import RegistrationForm from "../../components/registration-form/RegistrationForm.component";
import { useNavigate } from "react-router-dom";
import {firebaseContext} from '../../context/FirebaseContext';
const Authentication = () => {
    const {user} = useContext(firebaseContext);

    const navigate = useNavigate();
    if(user){
        navigate('/');
    }
    const [showLogin, setShowLogin] = useState(true);
    const handleShowLogin =()=> {
        setShowLogin(!showLogin);
    }
    return (
    <Fragment>
        <Outlet/>
      <div className="row text-start p-5 align-center">
          {showLogin && <div className="col-lg-6 col-sm-12">
          <LoginForm handleShowLogin={handleShowLogin} />
        </div>}
          {!showLogin && <div className="col-lg-6 col-sm-12">
          <RegistrationForm handleShowLogin={handleShowLogin} />
        </div>}
      </div>
    </Fragment>
  );
};

export default Authentication;
