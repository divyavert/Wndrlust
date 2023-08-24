import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, SetRedirect] = useState(false);
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    try {
      e.preventDefault();
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('you are resgistred and can login now ');
      SetRedirect(true);
    } catch (e) {
      alert('email already taken');
      console.log(e);
    }
  }
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <div className='mt-4 flex items-center grow justify-around'>
        <div className='mb-32'>
          <h1 className='text-4xl  text-center mb-4'>Register</h1>
          <form className='max-w-md mx-auto ' onSubmit={registerUser}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Name'
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='password'
            />
            <button className='primary'>Register</button>
            <div className=' text-center py-2 text-gray-700'>
              Allready a member?{' '}
              <Link className=' text-black underline' to={'/login'}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
