import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        }).then(() => props.onLogout());
    }
    
    return (
        <div>
            <div id="playerName">
                <button
                type="button"
                className="button"
                onClick={() => navigate('/vote')}
                >Vote</button>
                <button
                type="button"
                className='button red'
                onClick={() => logout()} 
                >Logout</button>
            </div>
        </div>
    );
}