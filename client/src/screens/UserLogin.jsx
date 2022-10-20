import * as React from 'react';
import { Box, Button, Card, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [value, setValue] = React.useState('Controlled');
    const [name , setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [walletId, setWalletId] = React.useState("");

    const checkEmail = (event) => {
        setEmail(event.target.value);
        console.log(email);
    }

    const checkName = () => {
    }

    const checkWalletId = () => {
    }

    const navigate = useNavigate();
    const handleClickUserLogin = () => {
    navigate("/Home");
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
                height:'500px', 
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
                    Welcome back!
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
                    We're so excited to see you again!
                </Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" 
                sx={{  
                    display:"flex",
                    justifyContent:"center",  
                    mt: "2rem" ,
                    mr:"2rem",
                    ml:"2rem"
                    }} 
                    onChange={checkName}/>
                      <TextField id="outlined-basic" label="Email" variant="outlined" 
                sx={{  
                    display:"flex",
                    justifyContent:"center",  
                    mt: "1rem" ,
                    mr:"2rem",
                    ml:"2rem"
                    }}
                    onChange={checkEmail}/>
                      <TextField id="outlined-basic" label="Wallet ID" variant="outlined" 
                sx={{  
                    display:"flex",
                    justifyContent:"center",  
                    mt: "1rem" ,
                    mr:"2rem",
                    ml:"2rem"
                    }}
                    onChange={checkWalletId}/>

                <Button
                color="success"
                variant="contained"
                size="large"
                sx={{ minWidth: 150, mt: 5, ml :18, display:"flex", justifyContent:"center" ,
                flexDirection:'row',
                alignItems:'center',}}
                onClick={handleClickUserLogin}
                >
                Login
                </Button>   

                
            </Card> 
        </Box>
    </>
  )
                }

export default UserLogin