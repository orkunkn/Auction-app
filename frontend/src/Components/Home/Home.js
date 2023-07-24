import React from "react";
import Auction from "../Auction/Auction";
import { useState, useEffect } from "react";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [auctionList, setAuctionList] = useState([]);

    const refreshAuctions = () => {
        fetch("/auctions")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAuctionList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                }
            )
    }

    useEffect(() => {
        refreshAuctions();
    }, [])

    if (error) {
        return <div> Error!!! </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "#f0f5ff",
            }}>
                {auctionList.map(auction => (
                    <Auction title={auction.title} text={auction.text} value={auction.value} auctionId={auction.id} category={auction.category} username={auction.username} key={auction.id} endDate={auction.endDate} refreshAuctions={refreshAuctions}></Auction>
                ))}
            </div>
        );
    }
}

export default Home;