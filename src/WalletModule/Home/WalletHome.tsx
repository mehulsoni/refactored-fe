import React, {useEffect, useState} from 'react';

import {Button, Card, Col, Container, Dropdown, DropdownButton, Row} from 'react-bootstrap';
import {
    DAI_BALANCE,
    DAI_TRANSFER,
    LIST_TRANSACTIONS,
    MAINNET,
    SEND_TRANSACTION,
    WEB3_SERVICE,
} from '../../Constants/WalletConstant';
import SendTransaction from '../SendTransaction/SendTransaction';
import DaiBalance from '../DaiBalance/DaiBalance';
import DaiTransfer from '../DaiTransfer/DaiTransfer';
import Profile from '../Profile/Profile';
import {IProviderInfo, WalletProps} from '../../Components/Type';
import ListTransactions from '../ListTransaction/ListTrasactions';
import {getUserInfo, logout} from "../../Components/Util";

import {Cookies} from "react-cookie";
import Web3 from "web3";
import Portis from "@portis/web3";
import {navigate} from "@reach/router";
import {userInfo} from "os";

const cookies = new Cookies();


const WalletHome = ({web3Provider, provider, account}: WalletProps) => {


    const [balance, setBalance] = useState(0.0);
    const [selectAction, setSelectedAction] = useState('');
    const [web3ProviderState, setWeb3ProviderState] = useState<Web3>();

    if (!provider) {
        provider = cookies.get('provider');
    }

    if (!account) {
        account = cookies.get("account");
    }

    const loadInjectedAccountDetails = async () => {
        const isMetaMaskEnabled = await WEB3_SERVICE.isEnabled();
        if (isMetaMaskEnabled) {
            setWeb3ProviderState(new Web3(WEB3_SERVICE.getMetaMaskProvider()));
        }
    };

    const loadWeb3AccountDetails = async (selectedProvider: IProviderInfo | undefined) => {
        const provider = new Portis(selectedProvider!.id, MAINNET);
        setWeb3ProviderState(new Web3(provider.provider));
        return await provider.isLoggedIn();
    };

    useEffect(() => {
        if(!provider){
            alert('Error, Please try to login again');
            navigate!('/');
        }
        if (!web3Provider && provider) {
            const isInjected = WEB3_SERVICE.verifyInjectedProvider(provider.check);
            if (isInjected && 'isMetaMask' === provider.check) {
                loadInjectedAccountDetails().catch(console.error);
            } else {
                loadWeb3AccountDetails(provider).catch(console.error);
            }
        } else setWeb3ProviderState(web3Provider)
    }, []);

    useEffect(() => {
        if (web3ProviderState) {
            WEB3_SERVICE.listAccounts(web3ProviderState, function (accounts: any) {
                if (accounts && accounts[0]) {
                    WEB3_SERVICE.getAccountBalance(web3ProviderState, accounts[0], function (balance: any) {
                        setBalance(balance);
                    });
                }
            });
        }
    }, [web3ProviderState]);

    const renderChildDiv = () => {
        if (selectAction === LIST_TRANSACTIONS) {
            return (
                <ListTransactions setSelectedAction={setSelectedAction} account={account}
                                  web3Provider={web3ProviderState}/>
            );
        } else if (selectAction === SEND_TRANSACTION) {
            return (
                <SendTransaction setSelectedAction={setSelectedAction} account={account}
                                 web3Provider={web3ProviderState}/>
            );
        } else if (selectAction === DAI_BALANCE) {
            return <DaiBalance setSelectedAction={setSelectedAction} account={account}
                               web3Provider={web3ProviderState}/>;
        } else if (selectAction === DAI_TRANSFER) {
            return <DaiTransfer setSelectedAction={setSelectedAction} account={account}
                                web3Provider={web3ProviderState}/>;
        } else
            return <Profile setSelectedAction={setSelectedAction} account={account} web3Provider={web3ProviderState}/>;
    };

    const callSendTransaction = () => {
        setSelectedAction(SEND_TRANSACTION);
    };
    const callDaiBalance = () => {
        setSelectedAction(DAI_BALANCE);
    };

    const callListTransaction = () => {
        setSelectedAction(LIST_TRANSACTIONS);
    };

    const callDaiTransfer = () => {
        setSelectedAction(DAI_TRANSFER);
    };

    return (
        (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Connected to {provider && provider.name.toUpperCase()} Ethereum
                                    Mainnet
                                </Card.Title>
                                <Card.Text>
                                    { getUserInfo().loginAt && <div>Session Created at ({getUserInfo().loginAt})</div>}
                                </Card.Text>
                                <Card.Text>
                                    { getUserInfo().loginCount && <div> Login Attempted Count: ({getUserInfo().loginCount})</div>}
                                </Card.Text>
                                <br/>
                                <Card.Text>{account}</Card.Text>
                                <Card.Text>{balance}</Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <DropdownButton id="dropdown-basic-button" title="Action">
                                            <Dropdown.Item onClick={() => callSendTransaction()}>
                                                Send Transaction
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => callDaiTransfer()}>
                                                Transfer (Dai)
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => callDaiBalance()}>
                                                Balance (Dai)
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => callListTransaction()}>
                                                Transactions (History)
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </Col>{' '}
                                    <Col>
                                        <Button variant="primary" onClick={() => logout()}>
                                            {'Logout'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={8}>{renderChildDiv()}</Col>
                </Row>
            </Container>
        )
    );
};
export default WalletHome;
