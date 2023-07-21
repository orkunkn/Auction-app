import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import Offer from "../Offer/Offer";
import Button from "@mui/material/Button";
import OfferForm from "../Offer/OfferForm";

function Auction(props) {
    const { title, text, auctionId, value, category, username, endDate } = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [offerList, setOfferList] = useState([]);
    let disabled = localStorage.getItem("currentUser") == null ? true : false

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshOffers();
    };

    const refreshOffers = () => {
        fetch("/offers?auctionId=" + auctionId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setOfferList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                }
            )
    }

    useEffect(() => {
        refreshOffers();
    }, [])

    return (
        <Card sx={{
            width: 530,
            textAlign: "left",
            margin: 5,
            borderStyle: 'ridge', borderWidth: 'medium', borderRadius: '20px', borderColor: 'blue'
        }}>
            <CardHeader style={{ textAlign: "center", borderBottom: "3px solid black" }}
                title={username}
            />
            <CardContent>
                <Typography variant="h3" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                    {title}
                </Typography>
                <Typography variant="h5" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                    {category}
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                    {text}
                </Typography>
                <Typography variant="h3" style={{ textAlign: 'center', borderStyle: 'solid', borderWidth: 'medium', borderRadius: '20px', borderColor: 'blue' }}>
                    {value} TL
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {disabled ? <Button variant="contained" sx={{ marginLeft: 'auto' }}>Login To See Previous Offers</Button>
                    : <Button variant="contained" onClick={handleExpandClick} aria-expanded={expanded} sx={{ marginLeft: 'auto' }}>Show Previous Offers</Button>}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <Container fixed >
                    <OfferForm userId={localStorage.getItem("currentUser")} auctionId={auctionId} value={value} ></OfferForm>
                    {error ? "error" :
                        isLoaded ? offerList.toReversed().map(offer => (
                            <Offer bid={offer.bid} username={username} key={offer.id}></Offer>
                        )) : "Loading"}
                </Container>
            </Collapse>
        </Card>
    );
}

export default Auction;