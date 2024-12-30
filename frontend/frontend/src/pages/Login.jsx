import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserByUsername } from '../api/UserService';

const Login = ({handleAuthenticate}) => {
  const [password, setPassword] = useState('');
  const [username, setLogin] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.login = 'Login is required';
      toast.error(newErrors.login);
    } else if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      newErrors.login = 'Login must be 3-20 characters long';
      toast.error(newErrors.login);
    } else if (username.length < 3  || username.length > 20) {
      newErrors.login = 'Login must be 3-20 characters long';
      toast.error(newErrors.login);
    }

    if (!password) {
      newErrors.password = 'Password is required';
      toast.error(newErrors.password);
    } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>+-]+$/.test(password))  {
      newErrors.password = 'Password contains invalid characters';
      toast.error(newErrors.password);
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      toast.error(newErrors.password);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAuthentication = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password}),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'An error occurred');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      const accessTokenData = JSON.parse(atob(accessToken.split('.')[1]));
      const refreshTokenData = JSON.parse(atob(refreshToken.split('.')[1]));
      
      Cookies.set('accessToken', accessToken, {expires: new Date(accessTokenData.exp * 1000)});
      Cookies.set('refreshToken', refreshToken, {expires: new Date(refreshTokenData.exp * 1000)});
      const sub = accessTokenData.sub;
      const user = await getUserByUsername(sub);
      Cookies.set('user', JSON.stringify(user));
      handleAuthenticate();
      navigate("/tasks");
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login:' + error);
    }
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="loginWrapper">
      <div className="loginForm">
        <input
          value={username}
          onChange={(e) =>
            setLogin(e.target.value)}
          placeholder="Enter login"
          autoCapitalize="none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button className="loginBtn" onClick={handleAuthentication}>Login</button>
        <button className="toRegistration" onClick={goToRegistration}>{'Don\'t have any account? Register now'}</button>
      </div>
    </div>
  )
}

export default Login