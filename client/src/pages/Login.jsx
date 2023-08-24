import axios from 'axios';
import React, { useContext, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContextProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, SetRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function loginUser(e) {
    try {
      e.preventDefault();
      const userInfo = await axios.post('/login', {
        email,
        password,
      });

      setUser(userInfo.data);
      alert('loged in');
      SetRedirect(true);
    } catch (e) {
      alert('password and email not matched');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 flex items-center grow justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl  text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={loginUser}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
          <button className='primary'>login</button>
          <div className=' text-center py-2 text-gray-700'>
            Dont have account yet ?{' '}
            <Link className=' text-black underline' to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
