import { Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OfferForm(props) {
    const { auctionId, userId, value, refreshAuctions } = props;
    const [bid, setBid] = useState(0);
    const [isLowOffer, setIsLowOffer] = useState(false)

    const logOut = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("username")
        window.history.go(0)
    }

    const saveOffer = () => {
        fetch("/offers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auctionId: auctionId,
                userId: userId,
                bid: bid
            })
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

                            if (result !== undefined) {
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
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    value: bid
                }),
            })
            .then((res) => refreshAuctions())
            .catch((err) => console.log("error"))
    }

    const isBidValid = () => {
        return bid > value;
    }

    const handleSubmit = () => {
        if (isBidValid()) {
            saveOffer();
            updateAuction();
            setBid(0);
        }
        else
            setIsLowOffer(true)
    }

    const handleChange = (value) => {
        setBid(value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setIsLowOffer(false);
    };

    return (
        <div>
            <Snackbar open={isLowOffer} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Your offer cannot be lower than the current one!
                </Alert>
            </Snackbar>
            <CardContent sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <OutlinedInput
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
        </div>
    )
}

export default OfferForm;