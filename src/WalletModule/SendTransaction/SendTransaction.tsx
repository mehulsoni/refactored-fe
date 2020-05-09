import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SIGN, WEB3_SERVICE } from "../../Constants/WalletConstant";
import { AccountProps } from "../../Components/Type";

const SendTransaction = ({
  setSelectedAction,
  account,
  web3Provider
}: AccountProps) => {
  const [result, setResult] = useState("");

  const sendTransaction = (
    toAddress: string,
    value: string,
    privateKey: string,
    tokenAddress: string
  ) => {
    const receipt = WEB3_SERVICE.sendToken(
      web3Provider,
      account,
      toAddress,
      1,
      privateKey,
      tokenAddress
    );
    setResult(receipt);
  };

  const back = () => {
    setSelectedAction(SIGN);
  };

  return (
    <div>
      <h3>Send Transaction</h3>
      <h5>{account}</h5>
      <Formik
        initialValues={{
          tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          value: ".01",
          privateKey:
            "910264AFC76F52BDB85B8456F56E34E8FBD0DD4C69D5718357861F993C4A7874"
        }}
        onSubmit={(values, actions) => {
          sendTransaction(
            values.address,
            values.value,
            values.privateKey,
            values.tokenAddress
          );
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Container>
                <Row>
                  <Col sm={5}>
                    <Form.Label>From Address</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.address}
                      onBlur={props.handleBlur}
                      name="address"
                      type="address"
                      placeholder="Enter Address"
                    />
                    <Form.Label>Token Address</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.tokenAddress}
                      onBlur={props.handleBlur}
                      name="tokenAddress"
                      type="tokenAddress"
                      placeholder="Enter token address"
                    />
                  </Col>
                  <Col sm={5}>
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.value}
                      onBlur={props.handleBlur}
                      name="value"
                      type="value"
                      placeholder="Enter value"
                    />
                    <Form.Label>Private Key</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.privateKey}
                      onBlur={props.handleBlur}
                      name="privateKey"
                      type="privateKey"
                      placeholder="Enter private key"
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Transaction
            </Button>{" "}
            <Button onClick={() => back()} variant="primary" type="button">
              Return
            </Button>
          </form>
        )}
      </Formik>
      <br />
      {result && <p>Message: {JSON.stringify(result)}</p>}
    </div>
  );
};

export default SendTransaction;
