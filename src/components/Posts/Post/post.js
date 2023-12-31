import React from 'react'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import {useDispatch} from "react-redux";
import { deletePost , likePost } from '../../../actions/postsActions';
import {useNavigate} from "react-router-dom";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import "./post.css";

const Post = ({post,setCurrentId}) => {
  const dispatch = useDispatch();
    
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" /> &nbsp; Like </>;
    };

    const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <Card className="card" raised elevation={6}>
    
      <CardMedia className="media" image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className="overlay">
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?._id === post?.creator) && (
        <div className="overlay2">
        <Button style={{color: "white"}} size='small' onClick={()=>setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      )}
     
      <div className="details">
      <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className="title" variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
      <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
     
      <CardActions className="cardActions">
        <Button size='small' color='primary' disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
        </Button>
        )}

        <Button size='small' color='primary' className="cardAction" onClick={openPost}>
         <RemoveRedEyeRoundedIcon />
        </Button>
        
      </CardActions>
    </Card>
  )
}

export default Post