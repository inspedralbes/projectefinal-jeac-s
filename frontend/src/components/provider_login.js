import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { saveData } from './actions';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [psswd, setPassword] = useState('');
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const data = useSelector((state) => state.data);

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
                dispatch(saveData(data[0]));
            } else {
                dispatch(actions.logout());
            }
        } catch (error) {
            console.error(error);
        }
    };

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
        </form>
    );
};



export default LoginForm;
