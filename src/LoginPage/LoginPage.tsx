import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { navigate } from "@reach/router";
import { userService } from "../Services/UserServices";
import HomePage from "../HomePage/HomePage";

const LoginPage = () => {
  const [isLogined, setIsLogined] = useState(false);

  function onSuccess(response: string | void) {
    if (response === undefined) {
      setIsLogined(false);
      navigate!("/login");
    } else {
      setIsLogined(true);
      navigate!("/");
    }
  }

  return !isLogined ? (
    <div>
      <h3>Login</h3>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={(values, actions) => {
          userService
            .login(values.email, values.password)
            .then(response => onSuccess(response))
            .catch(console.error);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Container>
                <Row>
                  <Col sm={5}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.email}
                      onBlur={props.handleBlur}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.password}
                      onBlur={props.handleBlur}
                      name="password"
                      type="password"
                      placeholder="Enter your passsword"
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{" "}
            <Button href={"/register"} variant="primary" type="button">
              Register
            </Button>
          </form>
        )}
      </Formik>
      <br />
    </div>
  ) : (
    <HomePage />
  );
};

export default LoginPage;
