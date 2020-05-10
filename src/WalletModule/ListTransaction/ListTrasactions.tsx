import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {SIGN, WEB3_SERVICE} from "../../Constants/WalletConstant";
import {AccountProps} from "../../Components/Type";

const ListTransactions = ({
                            setSelectedAction,
                            account,
                            web3Provider
                          }: AccountProps) => {
  const [txList, setTxList] = useState([]);

  useEffect(() => {
    if (web3Provider && account) {
      const transactionList = WEB3_SERVICE.getTransactionList(
          web3Provider,
          account
      );
      setTxList(transactionList);
    }
  }, [web3Provider]);

  const back = () => {
    setSelectedAction(SIGN);
  };

  return (
      <div>
        <Container>
          <Row>
            <Col sm={12}></Col>
            <Col sm={12}>
              <Card style={{width: "100%"}}>
                <Card.Body>
                  <Card.Title>Account Transactions</Card.Title>
                  <Card.Body>
                    {txList.map((value: any) => {
                      return (
                          <div key={value[0]}>
                            Transaction Number: {value[0]} <br/>
                            From Account: {value[1]} <br/>
                            To Account: {value[2]} <br/>
                            Tx. Amount: {value[3]} <br/>
                          </div>
                      );
                    })}
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
          <Button onClick={() => back()} variant="primary" type="button">
            Return
          </Button>
        </Container>
      </div>
  );
};

export default ListTransactions;
