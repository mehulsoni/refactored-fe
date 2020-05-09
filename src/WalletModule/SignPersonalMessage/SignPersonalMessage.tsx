import React, { useState } from "react";
import { Formik } from "formik";
import { SIGN, WEB3_SERVICE } from "../../Constants/WalletConstant";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { hashPersonalMessage } from "../../Components/Util";
import { AccountProps } from "../../Components/Type";
import { walletService } from "../../Services/WalletServices";

const SignPersonalMessage = ({
  setSelectedAction,
  account,
  web3Provider
}: AccountProps) => {
  const [signedMessage, setSignedMessage] = useState("");
  const [auth, setAuth] = useState("");

  const signPersonalMessage = (
    account: string,
    password: string,
    message: string
  ) => {
    const messageUpdated = message + "-" + new Date().getTime();
    const signedMessage = WEB3_SERVICE.signPersonalMessage(
      web3Provider,
      hashPersonalMessage(messageUpdated),
      account,
      password,
      function (sign: any) {
        walletService
          .validateSignedMessage(messageUpdated, account, sign)
          .then(response => setAuth(JSON.stringify(response)))
          .catch(console.error);
        setSignedMessage(sign);
      }
    );
    console.log(signedMessage);
  };

  const back = () => {
    setSelectedAction(SIGN);
  };

  return (
    <div>
      <h3>Sign Personal Message</h3>
      <h5>{account}</h5>
      <Formik
        initialValues={{ email: "test@gmail.com", password: "your password" }}
        onSubmit={(values, actions) => {
          signPersonalMessage(account, values.password, values.email);
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Container>
                <Row>
                  <Col sm={5}>
                    <Form.Label>Message (Email Address)</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.email}
                      onBlur={props.handleBlur}
                      name="email"
                      type="email"
                      placeholder="Enter signing message"
                    />
                    <Form.Label>Account Password</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.password}
                      onBlur={props.handleBlur}
                      name="password"
                      type="password"
                      placeholder="Enter password"
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign message
            </Button>{" "}
          </form>
        )}
      </Formik>
      <br />
      {signedMessage && <p>Message: {signedMessage}</p>}
      {auth && <p>Backend Auth: {auth}</p>}
    </div>
  );
};

export default SignPersonalMessage;
