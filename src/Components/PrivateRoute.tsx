import {RouteComponentProps} from "@reach/router";
import React, {ReactElement} from "react";
import HomePage from "../HomePage/HomePage";

import {Cookies} from "react-cookie";
import {validate} from "./Util";

const cookies = new Cookies();

interface Props extends RouteComponentProps {
  renderRoute: () => ReactElement;
}

/**
 * Secure access router.
 */
export const PrivateRoute = ({path, renderRoute}: Props) => {
  return localStorage.getItem('user') ?
      renderRoute() : <HomePage/>;
};
