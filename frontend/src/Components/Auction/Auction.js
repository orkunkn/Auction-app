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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';

function Auction(props) {
    const { title, text, auctionId, value, category, username, endDate, refreshAuctions } = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [offerList, setOfferList] = useState([]);
    let disabled = localStorage.getItem("currentUser") == null ? true : false

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshOffers();
    };

    const handleDeleteClick = () => {
        deleteAuction();
        refreshAuctions();
    }

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

    const deleteAuction = () => {
        fetch("/auctions/" + auctionId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        refreshOffers();
    }, [])

    return (
        <Card sx={{
            width: 530,
            height: '100%',
            textAlign: "left",
            margin: 5,
            borderStyle: 'ridge', borderWidth: 'medium', borderRadius: '20px', borderColor: 'blue'
        }}>
            <CardHeader style={{ textAlign: "center", borderBottom: "3px solid black" }}
                title={`From ${username}`} action={localStorage.getItem("username") === username ? <HighlightOffIcon onClick={handleDeleteClick} fontSize="large"></HighlightOffIcon> : null}> </CardHeader>
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
                {new Date() > new Date(endDate) ?
                    <Typography variant="h6" style={{ textAlign: 'center', paddingBottom: '50px', color: 'red' }}>
                        Auction is ended
                    </Typography> : <Typography variant="h6" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                        End date: {dayjs(endDate).format('ddd, MMM D, YYYY h:mm A')}
                    </Typography>}
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
                    {localStorage.getItem("username") === username ? "" : <OfferForm userId={localStorage.getItem("currentUser")} auctionId={auctionId} value={value} refreshAuctions={refreshAuctions} ></OfferForm>}
                    {error ? "error" :
                        isLoaded ? offerList.toReversed().map(offer => (
                            <Offer bid={offer.bid} username={offer.username} key={offer.id}></Offer>
                        )) : "Loading"}
                </Container>
            </Collapse>
        </Card>
    );
}

export default Auction;