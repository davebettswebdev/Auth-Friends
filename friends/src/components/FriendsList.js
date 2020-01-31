import React, { useEffect, useState, useDebugValue } from 'react';
import { axiosWithAuth } from '../auth/axiosWithAuth';

function FriendsList() {

    const [list, setList] = useState([]);
    const [newFriend, setNewFriend] = useState({
        name: '',
        age: '',
        email: ''
    });

    useEffect(() => {
        axiosWithAuth().get('http://localhost:5000/api/friends')
            .then(res => {
                console.log(res.data);
                setList(res.data);
            })
    },[])

    useEffect(() => console.log(newFriend), [newFriend]);

    const handleChange = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value
        })
    }

    const handleNewFriend = event => {
        event.preventDefault();
        axiosWithAuth().post('http://localhost:5000/api/friends', newFriend)
            .then(res => {
                console.log('NEW FRIEND', res);
                setList(res.data);
            })
    }
    
    return(
        <div>
            <h1>FriendsList</h1>
            <form onSubmit={handleNewFriend}>
                <input type='text' placeholder='name' name='name' value={newFriend.name} onChange={handleChange} />
                <input type='number' placeholder='age' name='age' value={newFriend.age} onChange={handleChange} />
                <input type='text' placeholder='email' name='email' value={newFriend.email} onChange={handleChange} />
                <button>Add friend</button>
            </form>
            {list.map((friend, index) => (
                <div key={index}>
                    <h2>{friend.name}</h2>
                    <p>Email: {friend.email}</p>
                    <p>Age: {friend.age}</p>
                </div>
            ))}
        </div>
    );
}

export default FriendsList;