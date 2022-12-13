import {useContext, useNavigation, useState} from 'react'
import {useLocation, Link} from 'react-router-dom'

export default function Success() {
    return (
        <div className="App" style={{paddingTop: 20, paddingBottom: 20, flex: 1, flexDirection: 'column', justityContent: 'center'}}>
            <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center',flexDirection: 'column', marginLeft: '10%' }}>
                <div style={{textDecoration: 'none', padding: 10, borderWidth: '2px', borderColor: 'black', borderRadius: '8px', backgroundColor: 'red', width: '40%'}}><span style={{padding: 10, alignText: 'center', textDecoration: 'none',color: 'white', borderWidth: '2px', borderColor: 'black', borderRadius: '15px'}}>Cash on delivery</span></div>
                <Link to={'/payPalButton'} style={{textDecoration: 'none', padding: 10, borderWidth: '2px', borderColor: 'white', borderRadius: '8px', backgroundColor: 'blue', marginTop: 20, width: '40%'}}><span style={{padding: 10, alignText: 'center', textDecoration: 'none',color: 'white', borderWidth: '2px', borderColor: 'black', borderRadius: '15px'}}>Online Payment</span></Link>
            </div>

        </div>
    );
}
