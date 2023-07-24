import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";

function Auth() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        console.log(value)
        setPassword(value);
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken)
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("username", username)
                window.history.go(0);

            })
    }

    const handleButton = (path) => {
        sendRequest(path);
    }

    return (
        <FormControl sx={{ marginTop: "250px" }}>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input
                    onChange={(i) => handleUsername(i.target.value)} />
            </FormControl>
            <FormControl>
                <InputLabel style={{ top: 40 }}>Password</InputLabel>
                <Input style={{ top: 40 }} type="password"
                    onChange={(i) => handlePassword(i.target.value)} />
            </FormControl>
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'
                }}
                onClick={() => handleButton("login")}
            >Login</Button>
            <FormHelperText style={{ margin: 20 }}>Don't have an account?</FormHelperText>
            <Button variant="contained"
                style={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'
                }}
                onClick={() => handleButton("register")}
            >Register</Button>
        </FormControl>
    )
}

export default Auth;