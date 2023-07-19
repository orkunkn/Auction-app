import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";
import Offer from "../Offer/Offer";
import Button from "@mui/material/Button";
import OfferForm from "../Offer/OfferForm";

function Auction(props) {
    const { title, text, auctionId, value, category } = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [offerList, setOfferList] = useState([]);

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
            width: 600,
            textAlign: "left",
            margin: 20
        }}>
            <CardHeader style={{ textAlign: 'center' }}
                title={title}
            />
            <CardContent>
                <Typography variant="body1" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                    Category:{category}
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'center', paddingBottom: '50px' }}>
                    {text}
                </Typography>
                <Typography variant="h3" style={{ textAlign: 'center', borderStyle: 'solid', borderWidth: 'medium', borderRadius: '20px', borderColor: 'blue' }}>
                    {value} TL
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    sx={{
                        transform: 'rotate(0deg)',
                        marginLeft: 'auto'
                    }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show offers"
                >
                    <Button variant="contained">Show Previous Offers</Button>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container fixed>
                    <OfferForm userId={1} auctionId={auctionId} ></OfferForm>
                    {error ? "error" :
                        isLoaded ? offerList.map(offer => (
                            <Offer bid={offer.bid}></Offer>
                        )) : "Loading"}
                </Container>
            </Collapse>
        </Card>
    );
}

export default Auction;