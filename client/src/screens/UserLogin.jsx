import * as React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import apiClient from "../axios.config";

const UserLogin = () => {
  const navigate = useNavigate();
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    async function getVoters() {
      const res = await apiClient.get("/getVoters");
      setVoters(res.data.voters);
    }
    getVoters();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("====================================");
  console.log(voters);
  console.log("====================================");
  const onSubmit = async (data) => {
    const { email, password, walletid } = data;
    try {
      //   await login(email, password);
      console.log(email, password, walletid);
      const filterVoters = voters.filter(
        (voter) => voter.walletid == walletid && voter.email == email
      );
      console.log("filterVoters", filterVoters);
      if (filterVoters.length > 0) {
        if (password == filterVoters[0].password) {
          const sendOtp = await apiClient.post("/sendOtp", {
            email: filterVoters[0].email,
          });
          console.log("sendOtp", sendOtp);
          navigate("/otp");
        } else {
          alert("Please enter correct password!");
        }
      } else {
        alert("You are not authorized!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          color: "text.primary",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            height: "500px",
            width: "500px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
              fontFamily: "monospace",
            }}
          >
            Welcome back!
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
              fontFamily: "monospace",
              fontSize: "1rem",
              color: "text.primary",
            }}
          >
            We're so excited to see you again!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Email"
              autoComplete="new-password"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "1rem",
                mr: "2rem",
                ml: "2rem",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p style={{ color: "#ED2C37", marginLeft: "2rem" }}>
              {errors.email?.message}
            </p>

            <TextField
              label="Wallet Address"
              variant="outlined"
              type="text"
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off",
                },
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "1rem",
                mr: "2rem",
                ml: "2rem",
              }}
              {...register("walletid", {
                required: "Wallet address is required",
              })}
            />
            {errors.walletid && (
              <p style={{ color: "#ED2C37", marginLeft: "2rem" }}>
                {errors.walletid.message}
              </p>
            )}

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off",
                },
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "1rem",
                mr: "2rem",
                ml: "2rem",
              }}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p style={{ color: "#ED2C37", marginLeft: "2rem" }}>
                {errors.password.message}
              </p>
            )}

            <Button
              color="success"
              variant="contained"
              size="large"
              sx={{
                minWidth: 150,
                mt: 5,
                ml: 18,
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default UserLogin;
