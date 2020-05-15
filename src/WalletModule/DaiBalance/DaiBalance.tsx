import React, {useState} from "react";
import {GET_PROFILE, WEB3_SERVICE} from "../../Constants/WalletConstant";
import {AccountProps} from "../../Components/Type";
import {Formik} from "formik";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {validate} from "../../Components/Util";
import {convertAmountFromRawNumber, formatFixedDecimals} from "../../Components/Bignumber";
import {PropagateLoader} from "react-spinners";
import {css} from "@emotion/core";

const DaiBalance = ({
                        setSelectedAction,
                        account,
                        web3Provider
                    }: AccountProps) => {
    const [daiBalance, setDaiBalance] = useState(-1.0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

    const getDaiBalance = (tokenAddress: string) => {
        setLoading(true)
        validate();
        WEB3_SERVICE.callBalanceOf(web3Provider, account, tokenAddress)
            .then((balance: any) => {
                setDaiBalance(balance);
                setLoading(false)
                setError(undefined)
            })
            .catch((err: any) => {
                setDaiBalance(-1.0);
                setError("Error: Running Out of Gas");
                setLoading(false)
            });
    };

    const back = () => {
        setSelectedAction(GET_PROFILE);
    };

    return (
        <div>
            {loading ? <div style={{marginLeft:'140px'}}><PropagateLoader
                    css={override}
                    size={15}
                    color={"#007bff"}
                    loading={loading}
                /></div> :
                <div><h3>Dai Balance</h3>
                    <h5>{account}</h5>
                    <Formik
                        initialValues={{
                            tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f"
                        }}
                        onSubmit={(values, actions) => {
                            getDaiBalance(values.tokenAddress);
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
                                <Button disabled={loading} variant="primary" type="submit">
                                    Get Dai Balance
                                </Button>{" "}
                                <Button onClick={() => back()} variant="primary" type="button">
                                    Return
                                </Button>
                            </form>
                        )}
                    </Formik>
                    <br/>
                    {daiBalance >= 0 && <p><b>Dai Balance: <span
						style={{color: "green"}}>{formatFixedDecimals(convertAmountFromRawNumber(daiBalance, 18), 4)} DAI</span></b>
					</p>}
                    {error && <p><b><span
						style={{color: "red"}}>{error} </span></b>
					</p>}
                </div>}
        </div>
    );
};

export default DaiBalance;
