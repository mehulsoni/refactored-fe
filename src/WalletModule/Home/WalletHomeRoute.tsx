import React from 'react';
import { Router } from '@reach/router';
import WalletHome from './WalletHome';

const WalletHomeRoute = () => {
    return (
        <div>
            <Router>
                <WalletHome path="/view/:userId" />
            </Router>
        </div>
    );
};

export default WalletHomeRoute;
