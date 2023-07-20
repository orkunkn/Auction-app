import { Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";


function OfferForm(props) {
    const { auctionId, userId } = props;
    const [bid, setBid] = useState(0);

    const logOut = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        window.history.go(0)
    }

    const saveOffer = () => {
        fetch("/offers", {
            auctionId: auctionId,
            userId: userId,
            bid: bid
        })
            .then((res) => {
                if (!res.ok) {
                    fetch("/auth/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: localStorage.getItem("currentUser"),
                            refreshToken: localStorage.getItem("refreshKey")
                        })
                    })
                        .then((res) => {
                            if (!res.ok) {
                                logOut();
                            } else {
                                return res.json()
                            }
                        })
                        .then((result) => {
                            console.log(result)

                            if (result != undefined) {
                                localStorage.setItem("tokenKey", result.accessToken);
                                saveOffer();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else
                    res.json()
            })
            .catch((err) => {
                console.log(err)
            })
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