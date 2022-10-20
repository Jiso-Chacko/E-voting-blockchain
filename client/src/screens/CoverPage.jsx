import * as React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material"; 
import CoverLayout from "../components/CoverLayout";
import { useNavigate } from "react-router-dom";

const backgroundImage =
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1400";

export default function CoverPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("home button clicked");
    navigate("/home");
    window.location.reload();
  };

  const handleClickUser = () => {
    navigate("/userLogin");
  }

  const handleClickAdmin = () => {
    navigate("/adminLogin");
  }

 
  return (
    <CoverLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Blockchain Based Voting System
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Welcome to E-Voting System Using BlockChain
      </Typography>
      <Box sx={{ display:"flex", justifyContent:"space-around"  }}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ minWidth: 200 }}
        onClick={handleClickUser}
      >
        User Login
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ minWidth: 200, ml: 2 }}
        onClick={handleClickAdmin}
      >
        Admin Login
      </Button>   
      </Box>
    </CoverLayout>
  );
}
