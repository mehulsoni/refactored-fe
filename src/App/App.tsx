import React from "react";
import "./App.css";
import {PrivateRoute} from "../Components/PrivateRoute";
import {Router} from "@reach/router";
import {Col, Container, Row} from "react-bootstrap";

const HomePage = React.lazy(async () => import("../HomePage/HomePage"));

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
          <PrivateRoute path="/" renderRoute={() => <HomePage />} />
          <PrivateRoute path="/wallet" renderRoute={() => <HomePage />} />
        </Router>
      </React.Suspense>
    </div>
  </React.StrictMode>
);

export default App;
