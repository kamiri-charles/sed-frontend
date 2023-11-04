import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import './styles.scss';

const SignIn = () => {

    let nav = useNavigate();
    let [userData, setUserData] = useState({username_or_email: '', password: ''});
    let [error, setError] = useState('');
    let [showPassword, setShowPassword] = useState(false);
    let [loading, setLoading] = useState(false);

    const sign_in = () => {
      setLoading(true);
      fetch('https://jit-api-a6d0d55add94.herokuapp.com/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          //localStorage.setItem('jit_user_data', JSON.parse(data));
          console.log(typeof(data))
          localStorage.setItem('jit_user_data', JSON.stringify(data));
          console.log(localStorage.getItem('jit_user_data'));
          setLoading(false);
          nav('/dashboard');
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };


    useEffect(() => {
      if (localStorage.getItem('jit_user_data') !== null) {
        nav('/dashboard');
      };
    }, [nav]);

    return (
      <div className='sign-in'>
        <div className='title'>
          <div className='name'>JS Issue Tracker</div>
          <div className='group'>Group D Project</div>
        </div>

        <form>
          <div className='form-title'>Sign in to your account.</div>
          <label>
            <span className={userData.username_or_email === '' ? '' : 'active'}>
              Username / Email address
            </span>

            <input
              className={userData.username_or_email === '' ? '' : 'active'}
              type='text'
              value={userData.username_or_email}
              onChange={(e) =>
                setUserData({ ...userData, username_or_email: e.target.value })
              }
              required
            />
          </label>
          <label>
            <span className={userData.password === '' ? '' : 'active'}>
              Password
            </span>

            <input
              className={userData.password === '' ? '' : 'active'}
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />

            <i
              className={
                showPassword
                  ? 'bx bx-hide show-password'
                  : 'bx bx-show show-password'
              }
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </label>

          <div className='error'>{error}</div>

          {loading ? <MetroSpinner color='#3066be' size={30} /> : (
            <button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              sign_in();
            }}
          >
            Log In
          </button>
          )}

          

          
        </form>
      </div>
    );
};

export default SignIn;