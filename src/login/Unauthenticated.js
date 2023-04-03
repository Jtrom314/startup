import { useState } from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                email: userName,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            setDisplayError(`ERROR: ${body.msg}`);
        }
    }
    return (
        <>
            <input 
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='your@email.com'
            />
            <input
                id="passWord"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <div>
                <button
                    type='button'
                    className='button'
                    onClick={() => loginUser()}
                >Login</button>
                <button
                    type='button'
                    className='button red'
                    onClick={() => createUser()}
                >Create</button>
            </div>
        </>
    )
}