import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/icons-material/Checkbox';
import { useNavigate } from "react-router-dom";
import UserTable from './UserTable';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [showError, setError] = useState(false);
    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email+","+password)
        setError(true);
       
       if (email === "Kshitij@yopmail.com" && password === "Test@123") {
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }

        // Clear previous errors
        setEmailError('');
        setPasswordError('');

        // Validate email and password
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit');
            return;
        }
        

    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Grid>{!showError ? (
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockRoundedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        label='Username'
                        placeholder='Enter username'
                        variant="outlined"
                        fullWidth
                        required
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        variant="outlined"
                        fullWidth
                        required
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                        Sign in
                    </Button>
                </form>
                <Typography>
                    <Link href="#">
                        Forgot password?
                    </Link>
                </Typography>
                <Typography> Do you have an account?
                    <Link href="#">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            )
            :(
            <div>
            { <UserTable loggedIn={loggedIn} />}
          </div>
            )
            }
        </Grid>
    );
};

export default Login;
