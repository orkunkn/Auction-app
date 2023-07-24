import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AuctionForm({ userId }) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [value, setValue] = useState(0);
    const [endDate, setEndDate] = useState("");
    const [isSent, setIsSent] = useState(false);

    const saveAuction = () => {
        fetch("/auctions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, userId, text, category, value, endDate }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };

    const handleSubmit = () => {
        console.log(endDate)
        if (title && text && category && value && endDate) {
            saveAuction();
            setIsSent(true);
            setTitle("");
            setText("");
            setCategory("");
            setValue(0);
            setEndDate("");
        }
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
                    <Typography component={'span'} variant="body2" color="text.secondary" sx={{ display: 'block', marginBottom: "20px" }}>
                        <OutlinedInput
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleChange(i.target.value, setText)}
                        />
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(i) => handleChange(i.target.value, setCategory)}
                        >
                            <MenuItem value={"Arts"}>Arts</MenuItem>
                            <MenuItem value={"Fashion"}>Fashion</MenuItem>
                            <MenuItem value={"Electronic"}>Electronic</MenuItem>
                            <MenuItem value={"Stationary"}>Stationary</MenuItem>
                            <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Last time to offer"
                                value={endDate}
                                onChange={(newValue) => handleChange(newValue, setEndDate)}
                                minDate={dayjs(new Date())}
                                sx={{ marginTop: "20px" }} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Typography component={'span'} variant="body2" color="text.secondary" sx={{ display: 'block', marginBottom: "20px", marginTop: "20px" }}>
                        <OutlinedInput
                            multiline
                            placeholder="Value"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={value}
                            onChange={(i) => handleChange(i.target.value, setValue)}

                        />
                    </Typography>
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
                </CardContent>
            </Card>
        </div>
    );
}

export default AuctionForm;