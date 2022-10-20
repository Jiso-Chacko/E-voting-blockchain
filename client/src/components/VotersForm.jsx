import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

export default function VotersForm({ contract, web3, currentAccount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.addVoter(name,email).send({ from: currentAccount });
      console.log("voter added");
    } catch (error) {
      console.log(error);
    }
    setName("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Voters Address"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Voter Email"
          variant="outlined"
          value={name}
          onChange={handleEmail}
        />
        <Button variant="contained" type="submit">
          Add Voter
        </Button>
      </Stack>
    </Box>
  );
}
