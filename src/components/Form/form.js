import React,{useState,useEffect} from 'react'
import {TextField,Button,Typography,Paper} from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch , useSelector } from 'react-redux';
import { createPost,updatePost } from '../../actions/postsActions';
import { useNavigate } from 'react-router-dom';
import "./form.css";

const Form = ({currentId,setCurrentId}) => {
    
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();

    const [postData,setPostData] = useState({
      title: "", message: "", tags: "", selectedFile: ""
    });

    useEffect(()=> {
        if(post) setPostData(post)
    },[post]);

    const handleSubmit = (e) => {
         e.preventDefault();

         if(currentId){
          dispatch(updatePost(currentId,{...postData,name: user?.result?.name}));
         }
         else{
          dispatch(createPost({...postData,name: user?.result?.name},navigate));
         }
          clear();
    }

    const clear = () => {
         setCurrentId(null);
         setPostData({title: "", message: "", tags: "", selectedFile: ""});
    }

    if(!user?.result?.name){
      return (
        <Paper className="paper">
          <Typography variant='h6' align='center'>
            Please sign in to create memories and like other's memories
          </Typography>
        </Paper>
      )
    }

  return (
    <Paper className="paper" elevation={6}>
      <form autoComplete='off' noValidate className="form" onSubmit={handleSubmit}>
          <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a memory</Typography>

          <TextField 
             name="title" 
             variant='outlined' 
             label="Title" 
             fullWidth 
             value={postData.title} 
             onChange={(e) => setPostData({...postData, title: e.target.value})} 
            />

          <TextField 
             name="message" 
             variant='outlined' 
             label="Message" 
             fullWidth 
             value={postData.message} 
             onChange={(e) => setPostData({...postData, message: e.target.value})} 
            />

          <TextField 
             name="tags" 
             variant='outlined' 
             label="Tags" 
             fullWidth 
             value={postData.tags} 
             onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} 
            />

            <div>
              <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
              />
            </div>
            <Button className="buttonSubmit" style={{margin: "10px 0"}} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
            <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form