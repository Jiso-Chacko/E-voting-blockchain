import * as React from 'react';
import { Box, Button, Card, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


const admin = {
    userName: "suhail",
    password: "Password"
}

const UserLogin = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('');
    const [userName , setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const checkUsername = (event) => {
        setUserName(event.target.value);
    }   

    const checkPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleClickAdminLogin = (event) => {
        event.preventDefault();
        if(userName === admin.userName && password === admin.password){
            navigate("/Home");
        }else{
            alert("Invalid login credentials");
        }
    }
   
  return (
    <>
        <Box sx={{ 
          display: 'flex', 
          justifyContent:"center", 
          alignItems:"center",  
            bgcolor: "background.default",
            color: "text.primary",
            height:"100vh"
        }}>
            <Card sx={{ 
                height:'400px', 
                width:"500px",  
            }}>
                <Typography 
                variant="h5"
                sx={{
                    display:"flex",
                    justifyContent:"center",  
                    mt: "1rem",
                    fontFamily: "monospace"
                }}>
                    Admin Login
                </Typography>
                <Typography
                    sx={{ 
                        display:"flex",
                        justifyContent:"center",  
                        mt: "1rem",
                        fontFamily: "monospace",
                        fontSize:"1rem",
                        color: "text.primary"
                    }}
                >
                    Please verify your credentials.
                </Typography>
                <TextField id="outlined-basic" label="Username" variant="outlined" 
                value={userName}
                sx={{  
                    display:"flex",
                    justifyContent:"center",  
                    mt: "2rem" ,
                    mr:"2rem",
                    ml:"2rem"
                    }} 
                    onChange={checkUsername}/>
                      <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                      value={password}
                sx={{  
                    display:"flex",
                    justifyContent:"center",  
                    mt: "1rem" ,
                    mr:"2rem",
                    ml:"2rem"
                    }}
                    onChange={checkPassword}/>

                <Button
                color="success"
                variant="contained"
                size="large"
                sx={{ 
                    minWidth: 150, 
                    display:"flex",
                    justifyContent:"center",  
                    mt: "2.5rem",
                    fontFamily: "monospace",
                    ml: 19
                }}
                type="submit"
                onClick={handleClickAdminLogin}
                >
                Login
                </Button>   

                
            </Card> 
        </Box>
    </>
  )
                }

export default UserLogin