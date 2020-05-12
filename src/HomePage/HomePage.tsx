import React, {useState} from "react";
import {Button, Card, CardGroup, Col, Container, Row} from "react-bootstrap";
import {METAMASK, PORTIS} from "../Providers";
import {IProviderInfo} from "../Components/Type";
import {MAINNET, WEB3_SERVICE} from "../Constants/WalletConstant";
import Web3 from 'web3';
import Portis from "@portis/web3";
import {hashPersonalMessage} from "../Components/Util";
import {walletService} from "../Services/WalletServices";
import WalletHome from "../WalletModule/Home/WalletHome";
import {Location, navigate} from "@reach/router";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

const HomePage = () => {
  const providers = [METAMASK, PORTIS];
  const [web3ProviderState, setWeb3ProviderState] = useState<Web3>();
  const [providerState, setProviderState] = useState<IProviderInfo>();
  const [accountState, setAccountState] = useState<string>();
  const [clicked, setClicked] = useState<boolean>(false);

  const loadInjectedAccountDetails = (message: string) => {
    const isMetaMaskEnabled = WEB3_SERVICE.isEnabled();
    if (isMetaMaskEnabled) {
      const web3_local = new Web3(WEB3_SERVICE.getMetaMaskProvider());
      setWeb3ProviderState(web3_local);
      sign(message, web3_local)
    }
  };

  const loadWeb3AccountDetails = (selectedProvider: IProviderInfo, message: string) => {
    const provider = new Portis(selectedProvider.id, MAINNET);
    provider.isLoggedIn().then(console.log).catch(console.log);
    const web3_local = new Web3(provider.provider);
    setWeb3ProviderState(web3_local);
    sign(message, web3_local)
  };

  const validate = (_account: string, message: string, signature: string) => {
    walletService.validateSignedMessage(message, _account, signature).then((r) => {
      localStorage.setItem('user', JSON.stringify(r))
      navigate!('/wallet')
    }).catch(console.error)
  };

  const sign = (message: string, web3Provider: Web3) => {
    if (web3Provider) {
      let _account = '';
      const account_callback_fn = (error: Error, accounts: string[]) => {
        if (error) {
          alert(error.message);
         setClicked(false);
        } else {
          const messageHashed = hashPersonalMessage(message);
          _account = accounts[0];
          setAccountState(accounts[0]);
          cookies.set("account", accounts[0])
          web3Provider.eth.sign(messageHashed, accounts[0], sign_callback_fn).catch(console.error);
        }
      };


      const sign_callback_fn = (error: Error, signature: string) => {
        if (error) {
          alert(error.message)
          setClicked(false);
        } else
          validate(_account, message, signature);
        setClicked(false);
      };
      web3Provider.eth.getAccounts(account_callback_fn).catch(console.error);
    }
  };

  const connect = (provider: IProviderInfo, message: string) => {
    cookies.set("provider", provider)
    setProviderState(provider);
    const isInjected = WEB3_SERVICE.verifyInjectedProvider(provider.check);
    setClicked(true);
    if (isInjected && 'isMetaMask' === provider.check) {
      loadInjectedAccountDetails(message);
    } else {
      loadWeb3AccountDetails(provider, message);
    }
  };

  const renderChildDiv = () => {
      return <WalletHome web3Provider={web3ProviderState} account={accountState} provider={providerState}/>
  };


  return (
      <Location>
        {({location}) => {

          return (
              localStorage.getItem('user') ? <div> {renderChildDiv()}</div> :
                  <div className="App">
                    <Container>
                      <Row>
                        <Col key={"container-card"}>
                          <CardGroup>
                            {providers.map((provider: IProviderInfo) => (
                                <Col key={provider.name}>
                                  <Card className="text-center">
                                    <Card.Body>
                                      <Card.Title>{provider.name}</Card.Title>
                                      <Card.Text>{provider.description}</Card.Text>
                                      <Card.Text>
                                        <small className="text-muted">{provider.type}</small>
                                      </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                      <Button
                                          disabled={clicked}
                                          variant="primary"
                                          onClick={() => connect(provider, "_zrY1phNMTqw4fd9WiSqSNOUa " + new Date().getTime())}
                                      >
                                        {"Connect"}
                                      </Button>
                                    </Card.Footer>
                                  </Card>
                                </Col>
                            ))}
                          </CardGroup>
                        </Col>
                      </Row>
                    </Container>
                  </div>
          );
        }}
      </Location>
  );
};

export default HomePage;
