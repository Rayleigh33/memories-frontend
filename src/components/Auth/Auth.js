import React,{useState} from 'react';
import {Avatar,Button,Grid,Paper,Typography,Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { signin,signup } from '../../actions/authActions';

import "./auth.css";

import Input from './Input';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword,setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState)

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
     e.preventDefault();
    if(isSignUp){
      dispatch(signup(formData,navigate));
    }
    else{
      dispatch(signin(formData,navigate)); 
    }
  }

  const handleChange = (e) => {
    
     setFormData({...formData , [e.target.name] : e.target.value});
  }

  const switchMode = () => {
     setIsSignUp((prevIsSignUp) => !prevIsSignUp);
      setShowPassword(false);
  }
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="Paper" elevation={3}>
        <Avatar className="Avatar"  style={{backgroundColor:"rgb(116, 18, 18)"}} >
           <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
           <Button type="submit" fullWidth variant='contained' color='primary' style={{margin: "24px 0 16px"}}>
            {isSignUp ? "Sign Up" : "Sign In"}
           </Button>
           <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "Already have an account?Sign In" : "Don't have an account?Sign Up"}
              </Button>
            </Grid>
           </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth