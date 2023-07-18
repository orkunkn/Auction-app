import { CardContent, OutlinedInput } from "@mui/material";
import React from "react";

function Offer(props) {
    const { bid } = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <OutlinedInput disabled
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{ maxLength: 10 }}
                fullWidth
                value={bid}
                style={{ color: "black", backGroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default Offer;