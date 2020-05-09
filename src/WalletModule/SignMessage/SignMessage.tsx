import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { WEB3_SERVICE, LIST_TRANSACTIONS } from '../../Constants/WalletConstant';
import { hashPersonalMessage } from '../../Components/Util';
import { AccountProps } from '../../Components/Type';
import { walletService } from '../../Services/WalletServices';

const SignMessage = ({ setSelectedAction, account, web3Provider }: AccountProps) => {
    const [signedMessage, setSignedMessage] = useState('');
    const [auth, setAuth] = useState('');

    const signMessage = async (account: string, message: string) => {
        const messageUpdated = message + '-' + new Date().getTime();
        await WEB3_SERVICE.signMessage(web3Provider, hashPersonalMessage(messageUpdated), account, function (sign: any) {
            walletService
                .validateSignedMessage(messageUpdated, account, sign)
                .then((response) => setAuth(JSON.stringify(response)))
                .catch(console.error);
            setSignedMessage(sign);
        });
    };

    const back = () => {
        setSelectedAction(LIST_TRANSACTIONS);
    };

    return (
        <div>
            <h3>Sign Message</h3>
            <h5>{account}</h5>
            <Formik
                initialValues={{ email: 'test@gmail.com' }}
                onSubmit={(values, actions) => {
                    signMessage(account, values.email);
                    actions.setSubmitting(false);
                }}
            >
                {(props) => (
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
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign message
                        </Button>{' '}
                        <Button onClick={() => back()} variant="primary" type="button">
                            Return
                        </Button>
                    </form>
                )}
            </Formik>
            <br />
            {signedMessage && <p>Message: {signedMessage}</p>}
            {auth && <p>Backend Auth: {auth}</p>}
        </div>
    );
};

export default SignMessage;
