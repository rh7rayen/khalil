import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import * as React from "react";
import { AiFillMobile, AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./App.css";

function SendCode() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [randomMessage, setRandomMessage] = React.useState("");
  const [code, setCode] = React.useState("");

  const generateRandomMessage = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    setRandomMessage(randomNumber.toString()); // Set the random number as the message
  };

  React.useEffect(() => {
    generateRandomMessage(); // Automatically generate a random message when the component mounts
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCode(randomMessage);
    const form = {
      number: phoneNumber,
      message:
        "Bonjour Votre code de Verification De compte ERIC KAYSER est :" +
        randomMessage,
      code,
    };

    axios
      .post("/api/sms", form)
      .then((res) => {
        alert("Success");
        // Navigate to the "verif" route after a successful submission
        navigate("/verif");
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <div className="App">
      <Divider className="divider">SMS SENDER</Divider>
      <Card>
        <CardContent className="inputs">
          <form onSubmit={onSubmitHandler} className="inputs">
            <FormControl variant="standard">
              <TextField
                id="number"
                label="Number"
                name="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillMobile />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <input type="hidden" name="message" value={randomMessage} />

            <Button
              variant="contained"
              type="submit"
              endIcon={<AiOutlineSend />}
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SendCode;
