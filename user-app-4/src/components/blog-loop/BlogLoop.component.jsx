import { useState, useEffect, useContext } from "react"

import { getPostsToLoop } from "../../utils/firebase/firebasefirestore.utils"
import {firebaseContext} from '../../context/FirebaseContext'
const BlogLoop = () => {
  const {blogs} = useContext(firebaseContext)

  return (
    <>
    {blogs.map((post) => (
    <div className="col-sm-12 col-lg-3 col-md-4">
      <div className="card m-4">
        <img
          className="card-img-top"
          src={post.data.Image}
          alt={post.data.BlockTitle}
        />
        <div className="card-body">
          <h5 className="card-title">{post.data.BlockTitle}</h5>
          <p className="card-text">
            {post.data.Description}
          </p>
        </div>
        <div className="card-footer">
          <span> {post.data.date} </span> <span> {post.data.Author} </span>
        </div>
      </div>
    </div>
    ))}
    </>
  );
};

export default BlogLoop;
