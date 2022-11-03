import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import apiClient from "../axios.config";
import "react-toastify/dist/ReactToastify.css";

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function VotersForm({ contract, web3, currentAccount }) {
  const { voters, insertVoters } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { voteraddress, email } = data;
    try {
      await contract.methods
        .addVoter(voteraddress)
        .send({ from: currentAccount });
      let password = makeid();
      insertVoters(voteraddress, email, password);
      const sendEmail = await apiClient.post("/email", {
        toAddress: email,
        address: voteraddress,
        password: password,
      });

      console.log("====================================");
      console.log("sendEmail", sendEmail);
      console.log("====================================");

      console.log("voter added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      autoComplete="off"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Voters Address"
            variant="outlined"
            {...register("voteraddress", {
              required: "Voter address is required",
            })}
          />
          <p style={{ color: "#ED2C37" }}>{errors.voteraddress?.message}</p>

          <TextField
            id="outlined-basic"
            label="Voter Email"
            variant="outlined"
            {...register("email", {
              required: "Voter email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <p style={{ color: "#ED2C37" }}>{errors.email?.message}</p>
          <Button variant="contained" type="submit">
            Add Voter
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
