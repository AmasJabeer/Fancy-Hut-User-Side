import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import {firebaseContext} from "../../context/FirebaseContext";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../utils/firebase/firebase.utils";



const AddBlogs = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/')
    }
    const [file, setFile] = useState(undefined);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [showError, setShowError] = useState(false);
    const {addBlock} = useContext(firebaseContext);

    const handleCreateBlock = ()=> {
        const file = image;
        if (!file) {
            setShowError(true)
        }else {

            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                        saveBlock(downloadURL)
                    });
                }
            )
        }
    }
    const saveBlock=async (image)=> {
        await  addBlock(title,description, image).then(()=> {
            navigate('/blog')
        });
    }
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleImageChange =(e)=> {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (

        <div style={{width: '100vw', height: '100vh'}}>
            <div class="card card-body">

                <form  method="POST" enctype="multipart/form-data"></form>
                <h4 class="card-header">Add Blogs</h4><br></br>
                <br></br>


                <div class="card-text">
                    <div class="form-group row">
                        <label for="productName" class="col-sm-2 col-form-label">Blog Title</label>
                        <div class="col-sm-10">
                            <input type="text"  name="PNAME" class="form-control" id="productName" required onChange={(e)=> setTitle(e.target.value)}></input>
                        </div>
                    </div>
                </div><br></br>

                <div class="card-text">
                    <div class="form-group row">
                        <label for="description" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="DESCRIPTION" id="description" rows="4" onChange={(e)=> setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div><br></br>


                <div class="card-text">
                    <div class="form-group row">
                        <label for="importimg" class="col-sm-2 col-form-label">Import Image</label>
                        <div class="col-sm-10">
                            <div class="custom-file">
                                <input type="file" name="file" onChange={(e)=> {
                                    handleImageChange(e);
                                    setShowError(false);
                                }}></input>
                            </div>
                        </div>
                    </div>
                </div>
                {showError && !image && <h6 style={{color: 'red'}}>Image required</h6>}
                <br></br>
                {
                    !imgUrl && progresspercent !== 0 &&
                    <div className='outerbar'>
                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                    </div>
                }
                { file && <img src={file} style={{width: '100px', height: '100px'}}/>}
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary btn-sm " name="sumbit" value="Add Product"
                            onClick={handleCreateBlock}>Create blog
                    </button>
                </div>


            </div>
        </div>





    );
};

export default AddBlogs;
