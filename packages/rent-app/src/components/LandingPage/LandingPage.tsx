import React from 'react';
import { getUser } from '../../api/authentication';

export default function LandingPage() {
    return (
        <div>
            <h1>Landing Page</h1>
            <button
                onClick={async () => {
                    await getUser();
                }}
            >
                Login
            </button>
        </div>
    );
}
