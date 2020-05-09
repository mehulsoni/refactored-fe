import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { WEB3_SERVICE } from '../../Constants/WalletConstant';
import { AccountProps } from '../../Components/Type';
import { userService } from '../../Services/UserServices';

const ListTransactions = ({ setSelectedAction, account, web3Provider }: AccountProps) => {
    const [txList, setTxList] = useState([]);

    useEffect(() => {
        const transactionList = WEB3_SERVICE.getTransactionList(web3Provider, account);
        setTxList(transactionList);
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={12}></Col>
                    <Col sm={12}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>Account Transactions</Card.Title>
                                <Card.Body>
                                    {txList.map((value: any) => {
                                        return (
                                            <div key={value[0]}>
                                                Transaction Number: {value[0]} <br />
                                                From Account: {value[1]} <br />
                                                To Account: {value[2]} <br />
                                                Tx. Amount: {value[3]} <br />
                                            </div>
                                        );
                                    })}
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ListTransactions;
