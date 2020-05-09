import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { navigate } from "@reach/router";
import { userService } from "../Services/UserServices";
const RegisterPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h3>Login</h3>
      <Formik
        initialValues={{
          password: "",
          email: "",
          firstName: "",
          lastName: ""
        }}
        onSubmit={(values, actions) => {
          userService
            .register(values)
            .then(() => navigate!("/login"))
            .catch(console.error);
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Container>
                <Row>
                  <Col sm={5}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.firstName}
                      onBlur={props.handleBlur}
                      name="firstName"
                      type="firstName"
                      placeholder="Enter First Name"
                    />
                    <br />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.lastName}
                      onBlur={props.handleBlur}
                      name="lastName"
                      type="lastName"
                      placeholder="Enter Last Name"
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
                    <br />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.email}
                      onBlur={props.handleBlur}
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    />{" "}
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Register
            </Button>{" "}
            <Button href={"/login"} variant="primary" type="button">
              Login
            </Button>
          </form>
        )}
      </Formik>
      <br />
    </div>
  );
};

export default RegisterPage;
