import React, {useState} from "react";
import {GET_PROFILE, WEB3_SERVICE} from "../../Constants/WalletConstant";
import {Formik} from "formik";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {AccountProps} from "../../Components/Type";
import {validate} from "../../Components/Util";

const DaiTransfer = ({
                         setSelectedAction,
                         account,
                         web3Provider
                     }: AccountProps) => {
    const [result, setResult] = useState("");

    const transferOf = (toAddress: string, value: number) => {
        validate();
        const transfer = WEB3_SERVICE.callTransferOf(
            web3Provider,
            account,
            toAddress,
            value
        );
        setResult(transfer);
    };

    const back = () => {
        setSelectedAction(GET_PROFILE);
    };

    return (
        <div>
            <h3>Dai Transfer</h3>
            <h5>{account}</h5>
            <Formik
                initialValues={{
                    address: "0x0000000000000000000000000000000000000000",
                    value: 1
                }}
                onSubmit={(values, actions) => {
                    transferOf(values.address, values.value);
                    actions.setSubmitting(false);
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Container>
                                <Row>
                                    <Col sm={5}>
                                        <Form.Label>Token Address</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            value={props.values.address}
                                            onBlur={props.handleBlur}
                                            name="address"
                                            type="address"
                                            placeholder="Enter signing message"
                                        />
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            value={props.values.value}
                                            onBlur={props.handleBlur}
                                            name="value"
                                            type="number"
                                            placeholder="Enter value"
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
            <br/>
            {result && <p>Message: {JSON.stringify(result)}</p>}
        </div>
    );
};

export default DaiTransfer;
