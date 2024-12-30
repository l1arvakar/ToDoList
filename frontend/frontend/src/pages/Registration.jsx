import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
        } else if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
            newErrors.username = 'Username contains invalid characters';
        } else if (username.length < 3 || username.length > 20) {
            newErrors.username = 'Username must be 3-20 characters long';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>+-]+$/.test(password))  {
            newErrors.password = 'Password contains invalid characters';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/registration', {
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
            console.log('Registration successful:', data);
            alert("User with\nusername: " + data.username + "\npassword: " + data.password + "\nsuccessfully created");
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error during registration:' + error);
        }
    };

    function goToLogin() {
        navigate('/login');
     }

    return (
        <div className="registrationWrapper">
            <div className="registrationForm">
                <div className='registrationFormWrapper'>
                    <div className='registrationForm_req'>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                        <button className="registrationBtn" onClick={handleRegister}>Registration</button>
                    </div>
                </div>
                <button className="toLogin" onClick={goToLogin}>{'Already have an account? Login now'}</button>
            </div>
        </div>
    );
};

export default Registration;