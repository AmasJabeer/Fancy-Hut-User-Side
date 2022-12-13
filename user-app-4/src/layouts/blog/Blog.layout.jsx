import {useEffect, useState} from 'react';
import BlogLoop from "../../components/blog-loop/BlogLoop.component"
import {useNavigate} from "react-router-dom";
import {useUserAuth} from '../../context/UserAuthContext'
const Blog = () => {
  let navigate = useNavigate();
  const {user} = useUserAuth();
    return (
    <div className="row">
      <BlogLoop/>
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
      {/*<BlogLoop/>*/}
        <div style={{
          position: 'fixed',
          borderRadius: '50%',
          width: '4rem',
          height: '4rem',
          color: 'white',
          bottom: 20,
          right: 20,
          textDecoration: 'none'
        }}
        onClick={()=> {
          if(user){
            navigate('/blogCreate')
          }else {
            navigate('/auth')
          }
        }}>
                    <i className="fa-solid fa-circle-plus" style={{marginTop: '1rem', fontSize: '4rem', color: 'green'}}></i>
        </div>
    </div>
  )
}

export default Blog
