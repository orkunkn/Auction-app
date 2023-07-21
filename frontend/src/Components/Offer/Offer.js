import { CardContent, OutlinedInput, Typography } from "@mui/material";
import React from "react";

function Offer(props) {
    const { username, bid } = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <OutlinedInput disabled
                multiline
                sx={{ display: 'inline-block' }}
                value={bid}
                style={{ color: "black", backGroundColor: "white" }}
            >
            </OutlinedInput>
            <Typography
                sx={{ display: 'inline-block', marginLeft: '100px' }}
                style={{ color: "black", backGroundColor: "white" }}
            >From {username}
            </Typography>
        </CardContent>
    )
}

export default Offer;