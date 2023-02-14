import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { saveData } from './actions';

const UserInfo = () => {
    const data = useSelector(state => state.data);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return (
        <div>
            {isLoggedIn ?
                <div>
                    < h2 > User Information</h2 >
                    <p>Name: {data[1].name}</p>
                    <p>Username: {data[1].username}</p>
                    <p>Email: {data[1].email}</p>
                    <p>Score: {data[1].totalScore}</p>

                </div >
                :
                <div>
                    <h2>You are not logged in</h2></div>
            }
        </div>
    )
};



export default UserInfo;
