import { RouteComponentProps } from '@reach/router';
import React, { ReactElement } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import { userInfo } from './Util';

interface Props extends RouteComponentProps {
    renderRoute: () => ReactElement;
}

/**
 * Secure access router.
 */
export const PrivateRoute = ({ path, renderRoute }: Props) => {
    return userInfo ? renderRoute() : path!.includes('register') ? <RegisterPage /> : <LoginPage />;
};
