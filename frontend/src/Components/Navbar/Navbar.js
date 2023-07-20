import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { LockOpen } from "@mui/icons-material";

function Navbar() {

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        window.history.go(0)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "justify" }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white",
                        }} to="/create">Create Auction</Link>
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
                        {localStorage.getItem("currentUser") == null ? <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to='/auth'>Login/Register</Link> :
                            <IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;