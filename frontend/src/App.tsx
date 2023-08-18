import './App.css';
import './index.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

// router
import MainPage from './web/pages/MainPage';
import RankingPage from './web/pages/RankingPage';
import MyPage from './web/pages/MyPage';
import MarketPage from './web/pages/MarketPage';
import BeforeEnteringPage from './web/pages/BeforeEnteringPage';
import WaitingRoomPage from './web/pages/WaitingRoomPage';
import GamePage from './web/pages/GamePage';
import LogInLoading from './web/components/User/LogInLoading';
import BackgroundImage from './web/assets/images/backgroundImg.png';

const App: React.FC = () => {
  return (
      <div 
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "1536px",
          margin: 0,
        }}
      >
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rank' element={<RankingPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/market' element={<MarketPage />} />
        <Route path='/before' element={<BeforeEnteringPage />} />
        <Route path='/waiting' element={<WaitingRoomPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/login/oauth2/google' element={<LogInLoading />} />
      </Routes>
    </div>
  );
}

export default App;
