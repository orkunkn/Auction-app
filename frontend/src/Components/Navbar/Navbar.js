import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {

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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;