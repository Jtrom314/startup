import React from 'react';

import { Unauthenticated } from './Unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    return (
        <div>
        <section></section>
        <section>
        <div style="text-align: center">
            <div>
                {authState !== AuthState.Unknown && <h3>Log in to vote!</h3>}
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
        </div>
    );
}