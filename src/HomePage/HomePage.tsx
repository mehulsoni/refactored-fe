import React from 'react';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { METAMASK, PORTIS } from '../Providers';
import { IProviderInfo } from '../Components/Type';

const HomePage = () => {
    const providers = [METAMASK, PORTIS];

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col key={'container-card'}>
                        <CardGroup>
                            {providers.map((provider: IProviderInfo) => (
                                <Col key={provider.name} xs={6}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>{provider.name}</Card.Title>
                                            <Card.Text>{provider.description}</Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">{provider.type}</small>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="primary" href={`/wallet/view/${provider.name}`}>
                                                {'Connect'}
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
};

export default HomePage;
