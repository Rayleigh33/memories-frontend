import React,{useState,useEffect} from 'react';
import {AppBar,Avatar,Button,Toolbar,Typography} from "@mui/material";


import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import {Link,useNavigate,useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";
import "./navbar.css";

const Navbar = () => {

   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const logout = () => {
    dispatch({type: "LOGOUT"});
    navigate("/");

    setUser(null);
   };
 
   useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
   }, [location])
   

  return (
    <AppBar className="appBar" position='static' color='inherit'>
    <Link to="/" className="brandContainer">
      <img src={memoriesText} alt='icon' height="45px" />
      <img className="image" src={memoriesLogo} alt='memories' height="40px" />
    </Link>
    <Toolbar className="toolbar">
        {user ? (
           <div className="profile">
            <Avatar className="purple" alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className="userName" variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className="logout" color='secondary' onClick={logout}>Logout</Button>
           </div>
        ) : (
             <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar