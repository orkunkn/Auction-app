import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import AuctionForm from './Components/Auction/AuctionForm';
import { Navigate } from 'react-router-dom';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<AuctionForm userId={1}/>}/>
          <Route exact path="/auth"
            element={localStorage.getItem("currentUser") != null ? (<Navigate to="/" />) : <Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
