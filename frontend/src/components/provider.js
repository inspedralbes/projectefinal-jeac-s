import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { Navigate } from 'react-router-dom';
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [psswd, setPassword] = useState('');
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, psswd }),
            });

            const data = await response.json();
            if (data.isLoggedIn) {
                dispatch(actions.login());
            } else {
                dispatch(actions.logout());
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={psswd}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            {isLoggedIn ? <p>You are logged in</p> : <p>You are not logged in</p>}
        </form>
    );

};

export default LoginForm;
