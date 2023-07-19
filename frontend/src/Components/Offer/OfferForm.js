import { Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";

function OfferForm(props) {
    const { auctionId, userId } = props;
    const [bid, setBid] = useState(0);
    const saveOffer = () => {
        fetch("/offers",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auctionId: auctionId,
                    userId: userId,
                    bid: bid
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const updateAuction = () => {
        fetch("/auctions/" + auctionId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    value: bid
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        saveOffer();
        updateAuction();
        setBid(0);
    }

    const handleChange = (value) => {
        setBid(value);
    }

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <OutlinedInput enabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >Offer
                        </Button>
                    </InputAdornment>
                }
                value={bid}
                style={{ color: "black", backGroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default OfferForm;