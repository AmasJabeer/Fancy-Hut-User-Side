import { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import { getCatagoriesToLoop } from "../../utils/firebase/firebasefirestore.utils";

import './CatagoryLoop.styles.css';
import {firebaseContext} from '../../context/FirebaseContext'
const CatagoryLoop = () => {
  const {categories, blogs} = useContext(firebaseContext)
  return (
    <>
      {categories.map((category) => (
        <Link to={`/products/${category.data.name}`} className="col-sm-12 col-lg-2 col-md-4" key={category.count} style={{textDecoration: 'none'}}>
          <div className="card m-2">
            <img
              className="card-img-top category-img"
              src={category.data.image}
              alt={category.data.name}
            />
            <div className="card-body">
              <h5 style={{textDecoration: 'none',color: 'black'}} className="card-title">{category.data.name} {category.data.name !== 'Cactus' && 'Plants'}</h5>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CatagoryLoop;
