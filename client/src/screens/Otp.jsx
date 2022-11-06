import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import apiClient from "../axios.config";

const Otp = () => {
  const navigate = useNavigate();
  const [voters, setVoters] = useState([]);
  const [otp, setOtp] = useState([]);
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  //   useEffect(() => {
  //     timer > 0 && setTimeout(timeOutCallback, 1000);
  //     console.log(timer);
  //   }, [timer, timeOutCallback]);

  useEffect(() => {
    async function getVoters() {
      const res = await apiClient.get("/getVoters");
      setVoters(res.data.voters);
      const resOtp = await apiClient.get("/getOtp");
      console.log("resOtp", resOtp);
      setOtp(resOtp.data.otp);
    }
    getVoters();
  }, []);

  const resetTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { userOtp } = data;
    try {
      console.log(userOtp, otp[0].otp, otp);
      if (otp[0].otp == userOtp) {
        navigate("/home");
      } else {
        alert("Enter a valid OTP");
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
            height: "300px",
            width: "500px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "2rem",
              fontFamily: "monospace",
            }}
          >
            Please enter the OTP!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Enter OTP"
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
                mt: "2rem",
                mr: "2rem",
                ml: "2rem",
              }}
              {...register("userOtp", {
                required: "OTP is required!",
              })}
            />
            {errors.userOtp && (
              <p style={{ color: "#ED2C37", marginLeft: "2rem" }}>
                {errors.userOtp.message}
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
              Login
            </Button>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Otp;
