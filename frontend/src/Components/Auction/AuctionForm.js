import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AuctionForm({ userId }) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [value, setValue] = useState(0);
    const [isSent, setIsSent] = useState(false);

    const saveAuction = () => {
        fetch("/auctions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, userId, text, category, value }),
        })
            .then((res) => res.json())
            .catch((err) => console.log("error"));
    };

    const handleSubmit = () => {
        saveAuction();
        setIsSent(true);
        setTitle("");
        setText("");
        setValue(0);
        setCategory("");
    };

    const handleChange = (value, setState) => {
        setState(value);
        setIsSent(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
            <Snackbar open={isSent} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your auction is started!
                </Alert>
            </Snackbar>
            <Card sx={{ width: 800 }}>
                <CardHeader
                    title={
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleChange(i.target.value, setTitle)}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "20px" }}>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleChange(i.target.value, setText)}
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "20px" }}>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Value"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={value}
                            onChange={(i) => handleChange(i.target.value, setValue)}
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Category"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={category}
                            onChange={(i) => handleChange(i.target.value, setCategory)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Create
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuctionForm;