import React, {useState} from "react";
import {GET_PROFILE, WEB3_SERVICE} from "../../Constants/WalletConstant";
import {Formik} from "formik";
import {AccountProps} from "../../Components/Type";
import {validate} from "../../Components/Util";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {PropagateLoader} from "react-spinners";
import {css} from "@emotion/core";

const DaiTransfer = ({
                         setSelectedAction,
                         account,
                         web3Provider
                     }: AccountProps) => {
    const [transactionHash, setTransactionHash] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const transferOf = async (toAddress: string, tokenAddress: string, value: number) => {
        setLoading(true);
        validate();
        await WEB3_SERVICE.callTransferOf(
            web3Provider,
            account,
            toAddress,
            tokenAddress,
            value
        ).then((result: string) => {
            setTransactionHash(result);
            setLoading(false);
            setError(undefined)
        }).catch((error: any) => {
            setLoading(false);
            setTransactionHash(undefined);
            setError("Transaction Failed !!!")
        });
    };

    const back = () => {
        setSelectedAction(GET_PROFILE);
    };

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

    return (
        <div>
            {loading ? <div style={{marginLeft: '140px'}}><PropagateLoader
                    css={override}
                    size={15}
                    color={"#007bff"}
                    loading={loading}
                /></div> :
                <div><h3>Dai Transfer</h3>
                    <Formik
                        initialValues={{
                            to_address: "0x0000000000000000000000000000000000000000",
                            token_address: "0x0000000000000000000000000000000000000000",
                            value: 1
                        }}
                        onSubmit={(values, actions) => {
                            transferOf(values.to_address, values.token_address, values.value);
                            actions.setSubmitting(false);
                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Container>
                                        <Row>
                                            <Col sm={7}>
                                                <Form.Label>From:{account}</Form.Label><br/>
                                                <Form.Label>Sending To</Form.Label>
                                                <Form.Control
                                                    onChange={props.handleChange}
                                                    value={props.values.to_address}
                                                    onBlur={props.handleBlur}
                                                    name="to_address"
                                                    type="string"
                                                    placeholder="Enter To Address"
                                                /><br/>
                                                <Form.Label>Token Address</Form.Label>
                                                <Form.Control
                                                    onChange={props.handleChange}
                                                    value={props.values.token_address}
                                                    onBlur={props.handleBlur}
                                                    name="token_address"
                                                    type="string"
                                                    placeholder="Enter Token Address"
                                                /><br/>
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
                                    Send Token
                                </Button>{" "}
                                <Button onClick={() => back()} variant="primary" type="button">
                                    Return
                                </Button>
                            </form>
                        )}
                    </Formik>
                    <br/>
                    {transactionHash && <p>Successfully Transferred: <b><span
		                style={{color: "green"}}>{transactionHash} </span></b>
	                </p>}
                    {error && <p><b><span
		                style={{color: "red"}}>{error} </span></b>
	                </p>}
                </div>}
        </div>
    );
};

export default DaiTransfer;
