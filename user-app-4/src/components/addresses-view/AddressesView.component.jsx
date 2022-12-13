import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import {firebaseContext} from '../../context/FirebaseContext'
const AddressesView = () => {
    const { currentUser } = useContext(UserContext);
    const { userDetail } = useContext(firebaseContext);
  return (
    <>
    <Outlet/>
        <div className="row m-4">
        {currentUser ? (
               <p >Hello {currentUser.displayName}</p>
              ) : (
                <p>Hello Guest</p>
              )}
            {!userDetail && <>  <p className='mt-2'>From your account dashboard you can view your recent orders, manage your shipping and billing addresses,
                and edit your password and account details.</p>
            <p className='mt-2'>
                You have not set up this type of address yet.
            </p>
            </>}
            {userDetail && <>
                <table className="table bordered striped">
                    <thead>
                    </thead>
                    <tbody>
                    <tr >

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Postal Code</th>
                    </tr>
                    <tr>

                        <th>{userDetail.firstName}</th>
                        <th>{userDetail.lastName}</th>
                        <th>{userDetail.address}</th>
                        <th>{userDetail.city}</th>
                        <th>{userDetail.country}</th>
                        <th>{userDetail.phone}</th>
                        <th>{userDetail.email}</th>
                        <th>{userDetail.postalCode}</th>
                    </tr>
                    </tbody>
                </table>
            </>}
            <div className="row mt-4">
                <a  className="btn btn-success" href='/dashboard/address-modify'>Edit Address</a>
            </div>
        </div>
    </>
  )
}

export default AddressesView
