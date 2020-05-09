import React, { useState } from 'react';
import { GET_PROFILE, WEB3_SERVICE } from '../../Constants/WalletConstant';
import { AccountProps } from '../../Components/Type';
import { Formik } from 'formik';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const DaiBalance = ({ setSelectedAction, account, web3Provider }: AccountProps) => {
    const [daiBalance, setDaiBalance] = useState();

    const getDaiBalance = (tokenAddress: string) => {
        WEB3_SERVICE.callBalanceOf(web3Provider, account, tokenAddress).then(setDaiBalance).catch(console.error);
    };

    const back = () => {
        setSelectedAction(GET_PROFILE);
    };

    return (
        <div>
            <h3>Dai Balance</h3>
            <h5>{account}</h5>
            <Formik
                initialValues={{ tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f' }}
                onSubmit={(values, actions) => {
                    getDaiBalance(values.tokenAddress);
                    actions.setSubmitting(false);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Container>
                                <Row>
                                    <Col sm={5}>
                                        <Form.Label>Token Address</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            value={props.values.tokenAddress}
                                            onBlur={props.handleBlur}
                                            name="tokenAddress"
                                            type="tokenAddress"
                                            placeholder="Enter Token Address"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Get Dai Balance
                        </Button>{' '}
                        <Button onClick={() => back()} variant="primary" type="button">
                            Return
                        </Button>
                    </form>
                )}
            </Formik>
            <br />
            {daiBalance && <p>Dai Balance: {daiBalance} xDAI</p>}
        </div>
    );
};

export default DaiBalance;
