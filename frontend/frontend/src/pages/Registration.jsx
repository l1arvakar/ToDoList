import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import { toast } from 'react-toastify'

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
            toast.error(newErrors.username);
        } else if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
            newErrors.username = 'Username contains invalid characters';
            toast.error(newErrors.username);
        } else if (username.length < 3 || username.length > 20) {
            newErrors.username = 'Username must be 3-20 characters long';
            toast.error(newErrors.username);
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
                toast.error(errorData);
                return;
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/login');
            toast.success("User with\nusername: " + data.username + "\npassword: " + data.password + "\nsuccessfully created");
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Error during registration:' + error);
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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button className="registrationBtn" onClick={handleRegister}>Registration</button>
                    </div>
                </div>
                <button className="toLogin" onClick={goToLogin}>{'Already have an account? Login now'}</button>
            </div>
        </div>
    );
};

export default Registration;