import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { useState } from 'react';

const Dashboard = () => {

    let nav = useNavigate();

    let [userData, setUserData] = useState();

    useEffect(() => {
        // Check if user is logged in
        if (!JSON.parse(localStorage.getItem('jit_user_data')).id) {
            // Redirect to sign in page
            nav('/sign-in');
        } else {
            setUserData(JSON.parse(localStorage.getItem('jit_user_data')));
        }
    }, [nav]);

    return (
        <div className='home'>
            Welcome, {userData?.username}!
        </div>
    )
};
export default Dashboard;