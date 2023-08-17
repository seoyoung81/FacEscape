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
import Test from './web/pages/Test';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      {/* <div className="background-image" style={{ backgroundImage: `url(${BackgroundImage})` }}> */}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rank' element={<RankingPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/market' element={<MarketPage />} />
        <Route path='/before' element={<BeforeEnteringPage />} />
        <Route path='/waiting' element={<WaitingRoomPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/login/oauth2/google' element={<LogInLoading />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
