import * as React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const UserLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("Controlled");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [walletId, setWalletId] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickUserLogin = () => {
    navigate("/Home");
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      //   await login(email, password);
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
                required: "Wallet address is required",
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
              Login
            </Button>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default UserLogin;
