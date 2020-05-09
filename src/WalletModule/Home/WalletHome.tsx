import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { METAMASK, PORTIS } from '../../Providers';
import Web3 from 'web3';

import { Button, Card, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import {
    DAI_BALANCE,
    DAI_TRANSFER,
    GET_PROFILE,
    WEB3_SERVICE,
    LIST_SIGNED_MESSAGES,
    LIST_TRANSACTIONS,
    PERSONAL_SIGN,
    SEND_TRANSACTION,
    SIGN,
} from '../../Constants/WalletConstant';
import SignPersonalMessage from '../SignPersonalMessage/SignPersonalMessage';
import SendTransaction from '../SendTransaction/SendTransaction';
import SignMessage from '../SignMessage/SignMessage';
import DaiBalance from '../DaiBalance/DaiBalance';
import DaiTransfer from '../DaiTransfer/DaiTransfer';
import Profile from '../Profile/Profile';
import Portis from '@portis/web3';
import { IProviderInfo } from '../../Components/Type';
import {logout, userInfo} from '../../Components/Util';
import { userService } from '../../Services/UserServices';
import ListTransactions from '../ListTransaction/ListTrasactions';
import ListSignedMessages from '../ListSignedMessages/ListSignedMessages';

const WalletHome = ({ userId }: RouteComponentProps<{ userId: string }>) => {
    const selectedProvider = [PORTIS, METAMASK].find((value) => value.name === userId);
    const [provider, setProvider] = useState<IProviderInfo>();
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState(0.0);
    const [account, setAccount] = useState('');
    const [web3Provider, setWeb3Provider] = useState<Web3>();
    const [spinner, setSpinner] = useState(true);
    const [selectAction, setSelectedAction] = useState('');

    useEffect(() => {
        setTimeout(() => setSpinner(false), 6000);
    }, []);

    const loadInjectedAccountDetails = () => {
        const metaMaskVersion = WEB3_SERVICE.metaMaskVersion();
        console.log(metaMaskVersion);
        const isMetaMaskEnabled = WEB3_SERVICE.isEnabled();
        if (isMetaMaskEnabled) {
            setWeb3Provider(new Web3(WEB3_SERVICE.getMetaMaskProvider()));
        }
    };

    const loadWeb3AccountDetails = (selectedProvider: IProviderInfo) => {
        const portis = new Portis(selectedProvider.id, 'mainnet');
        setWeb3Provider(new Web3(portis.provider));
    };

    const loadAccountBasedOnType = (selectedProvider: IProviderInfo) => {
        const isInjected = WEB3_SERVICE.verifyInjectedProvider(selectedProvider.check);
        if (isInjected && 'isMetaMask' === selectedProvider.check) {
            loadInjectedAccountDetails();
        } else {
            loadWeb3AccountDetails(selectedProvider);
        }
    };
    useEffect(() => {
        if (web3Provider) {
            WEB3_SERVICE.listAccounts(web3Provider, function (accounts: any) {
                if (accounts && accounts[0]) {
                    setAccounts(accounts);
                    setAccount(accounts[0]);

                    WEB3_SERVICE.getAccountBalance(web3Provider, accounts[0], function (balance: any) {
                        setBalance(balance);
                    });
                }
            });
        }
    }, [web3Provider]);

    useEffect(() => {
        if (selectedProvider) {
            setProvider(selectedProvider);
            loadAccountBasedOnType(selectedProvider);
        }
    }, [selectedProvider]);

    const renderChildDiv = () => {
        if (selectAction === PERSONAL_SIGN) {
            return (
                <SignPersonalMessage
                    setSelectedAction={setSelectedAction}
                    account={account}
                    web3Provider={web3Provider}
                />
            );
        } else if (selectAction === SIGN) {
            return <SignMessage setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />;
        } else if (selectAction === SEND_TRANSACTION) {
            return (
                <SendTransaction setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />
            );
        } else if (selectAction === DAI_BALANCE) {
            return <DaiBalance setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />;
        } else if (selectAction === DAI_TRANSFER) {
            return <DaiTransfer setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />;
        } else if (selectAction === GET_PROFILE) {
            return <Profile setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />;
        } else if (selectAction === LIST_SIGNED_MESSAGES) {
            return (
                <ListSignedMessages
                    setSelectedAction={setSelectedAction}
                    account={account}
                    web3Provider={web3Provider}
                />
            );
        } else
            return (
                <ListTransactions setSelectedAction={setSelectedAction} account={account} web3Provider={web3Provider} />
            );
    };
    const callSignPersonalMessage = () => {
        setSelectedAction(PERSONAL_SIGN);
    };
    const callSignMessage = () => {
        setSelectedAction(SIGN);
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

    const callListSignedMessages = () => {
        setSelectedAction(LIST_SIGNED_MESSAGES);
    };

    const callDaiTransfer = () => {
        setSelectedAction(DAI_TRANSFER);
    };

    return (
        !spinner && (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Connected to {selectedProvider && selectedProvider.name.toUpperCase()} Ethereum
                                    Mainnet
                                </Card.Title>
                                <br />

                                <Card.Text>
                                    {userInfo.user.firstName} {userInfo.user.lastName}
                                </Card.Text>
                                <Card.Text>{userInfo.user.email}</Card.Text>
                                <Card.Text>{account}</Card.Text>
                                <Card.Text>{balance}</Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <DropdownButton id="dropdown-basic-button" title="Action">
                                            <Dropdown.Item onClick={() => callSignMessage()}>
                                                Sign Message
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => callSignPersonalMessage()}>
                                                Sign Personal Message
                                            </Dropdown.Item>
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
                                            <Dropdown.Item onClick={() => callListSignedMessages()}>
                                                Signed Messages (History)
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
