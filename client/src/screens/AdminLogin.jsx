import * as React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const admin = {
  userName: "suhail",
  password: "Password",
};

const UserLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkUsername = (event) => {
    setUserName(event.target.value);
  };

  const checkPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickAdminLogin = (event) => {
    event.preventDefault();
    if (userName === admin.userName && password === admin.password) {
    } else {
      alert("Invalid login credentials");
    }
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (username === admin.userName && password === admin.password) {
        navigate("/Home");
      } else {
        alert("Invalid login credentials");
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
            height: "400px",
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
            Admin Login
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
            Please verify your credentials.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
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
              {...register("username", {
                required: "Username is required",
              })}
            />
            <p style={{ color: "#ED2C37", marginLeft: "2rem" }}>
              {errors.username?.message}
            </p>

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
                display: "flex",
                justifyContent: "center",
                mt: "2.5rem",
                fontFamily: "monospace",
                ml: 19,
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
