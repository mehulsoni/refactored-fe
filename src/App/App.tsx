import React from "react";
import "./App.css";
import { PrivateRoute } from "../Components/PrivateRoute";
import { Router } from "@reach/router";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Route } from "react-router";

const HomePage = React.lazy(async () => import("../HomePage/HomePage"));
const LoginPage = React.lazy(async () => import("../LoginPage/LoginPage"));
const RegisterPage = React.lazy(async () =>
  import("../RegisterPage/RegisterPage")
);
const WalletHomeRoute = React.lazy(async () =>
  import("../WalletModule/Home/WalletHomeRoute")
);

const divStyle = {
  margin: "10px"
};

const App = () => (
  <React.StrictMode>
    <div className="App">
      <div style={divStyle}>
        <Container>
          <Row>
            <Col xs={2}></Col>
          </Row>
        </Container>
      </div>
      <React.Suspense fallback={<img src="giphy.gif" alt="" />}>
        <Router>
          <PrivateRoute path="/login" renderRoute={() => <LoginPage />} />
          <PrivateRoute
            path="/wallet/*"
            renderRoute={() => <WalletHomeRoute />}
          />
          <PrivateRoute path="/" renderRoute={() => <HomePage />} />
          <PrivateRoute path="/register" renderRoute={() => <RegisterPage />} />
        </Router>
      </React.Suspense>
    </div>
  </React.StrictMode>
);

export default App;
