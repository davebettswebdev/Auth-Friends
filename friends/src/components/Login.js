import React, { useState } from 'react';

import { axiosWithAuth } from '../auth/axiosWithAuth';

function Login(props) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = event => {
        event.preventDefault();
        setIsLoading(true);
        axiosWithAuth().post('http://localhost:5000/api/login', credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                setIsLoading(false);
                props.history.push('/friendslist');
            })
    }

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    return(
        <div>
            <form onSubmit={handleLogin} >
                <input type='text' placeholder='username' name='username' value={credentials.username} onChange={handleChange} />
                <input type='password' placeholder='password' name='password' value={credentials.password} onChange={handleChange} />
                <button>Log in</button>
            </form>
        </div>
    );
}

export default Login;