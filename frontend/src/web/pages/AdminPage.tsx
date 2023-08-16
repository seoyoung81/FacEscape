import React, { useRef, useEffect } from 'react';
import UserChart from '../components/AdminPage/UserChart';
import ItemChart from '../components/AdminPage/ItemChart';
import * as echarts from 'echarts';

const AdminPage: React.FC = () => {
      
    
    return (
        <div>
            <UserChart />
            <ItemChart />
        </div>
    );
    };


export default AdminPage;
