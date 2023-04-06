import React from 'react';

import { Unauthenticated } from './Unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    console.log(authState !== AuthState.Unknown)
    console.log(authState)
    return (
        
        <>
        <section></section>
        <section>
        <div>
            <div id='LoginCard'>
                {authState !== AuthState.Unknown && (<h3>Log in to vote!</h3>)}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName= {userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                        />
                )}

            </div>
        </div>
        </section>
        <section></section>
        </>
    );
}